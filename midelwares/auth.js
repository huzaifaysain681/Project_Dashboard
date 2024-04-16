var passport = require("passport");
var localstrategy = require("passport-local");
var jwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
var config = require("../services/config");
var userModel = require("../models/user");

exports.local = passport.use(new localstrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey);
};
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtpassport = passport.use(
  new jwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.otpValidation) {
      return done(null, jwt_payload);
    } else if (jwt_payload.varifyApiKey) {
      return done(null, jwt_payload);
    } else
      userModel.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        } else if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
  })
);

exports.verifyToken = passport.authenticate("jwt", { session: false });

exports.changePhoneVarification = (req, res, next) => {
  const { optValidation } = req.user;
  if (optValidation) next();
  else {
    err = new Error("You are unauthorized to change phone number!");
    err.status = 403;
    return next(err);
  }
};
exports.verifyOtp = (req, res, next) => {
  const { otp } = req.user;
  const { code } = req.body;
  if (Number(code) === Number(otp)) next();
  else {
    err = new Error("Invalid Code!");
    err.status = 400;
    return next(err);
  }
};

exports.verifyUser = (req, res, next) => {
  var { user } = req;
  if (user) {
    next();
  } else {
    err = new Error("unauthorized!");
    err.status = 403;
    return next(err);
  }
};
exports.verifyAdmin = (req, res, next) => {
  var { user } = req;
  if (user.type === "admin") {
    next();
  } else {
    err = new Error("You are not authorized as Admin!");
    err.status = 403;
    return next(err);
  }
};
exports.verifyDataManager = (req, res, next) => {
  var { user } = req;
  if (user.privileges.includes("data-entry")) {
    next();
  } else {
    err = new Error("You are not authorized as Data Manager!");
    err.status = 403;
    return next(err);
  }
};
exports.verifyUserManager = (req, res, next) => {
  var { user } = req;
  if (user.privileges.includes("user-managment")) {
    next();
  } else {
    err = new Error("You are not authorized as Data Manager!");
    err.status = 403;
    return next(err);
  }
};
