const { getToken } = require("../midelwares/auth");
const { userModel, driversModel, signaturesModel } = require("../models");
const expression =
  /(?!.*\.{2})^([a-z\d!#$%&‘*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&‘*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|“((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?“)@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

exports.adminSignUp = (req, res, next) => {
  var { name, email, password, status, username, privileges } = req.body;
  userModel.register(
    new userModel({
      name,
      email,
      type: "admin",
      privileges,
      username,
      status,
    }),
    password,
    (err, user) => {
      if (err) return next(err);
      user.save().then((user) => {
        var token = getToken({ _id: user._id });
        res.json({ success: true, user: { ...user._doc, token } });
      });
    }
  );
};

exports.signup = (req, res, next) => {
  var { name, email, password, username, phone, department, faculty } = req.body;
  userModel.register(
    new userModel({
      name,
      email,
      username,
      phone,
      department, faculty
    }),
    password,
    (err, user) => {
      if (err) return next(err);
      user.save().then((user) => {
        var token = getToken({ _id: user._id });
        res.json({ success: true, user: { ...user._doc, token } });
      });
    }
  );
};
exports.driverSignup = (req, res, next) => {
  try {
    var { name, email, password, username, phone } = req.body;
    userModel.register(
      new userModel({
        name,
        email,
        type: "driver",
        username,
        phone,
      }),
      password,
      async (err, user) => {
        if (err) return next(err);
        try {
          var driver = await driversModel.create({
            name,
            email,
            user: user._id,
            username,
            phone,
          });
          user.driver = driver._id;
          var eUser = await user.save();
          var token = getToken({ _id: eUser._id });
          res.json({ success: true, user: { ...eUser._doc, token } });
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
exports.login = (req, res, next) => {
  var token = getToken({ _id: req.user._id });
  res.json({ success: true, user: { ...req.user._doc, token } });
};
exports.verifyUser = (req, res, next) => {
  var token = getToken({ _id: req.user._id });
  res.json({ success: true, user: { ...req.user._doc, token } });
};

exports.getAllDrivers = async (req, res, next) => {
  try {
    var { q, page, limit } = req.query;
    var query = { deleted: false };
    if (q) query.name = { $regex: q, $options: "i" };
    if (q) query.username = { $regex: q, $options: "i" };
    if (q) query.email = { $regex: q, $options: "i" };
    if (q) query.phone = { $regex: q, $options: "i" };
    page = Number(page);
    limit = Number(limit);
    if (!limit) limit = 10;
    if (!page) page = 1;
    Promise.all([
      driversModel.find(query).count(),
      driversModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit),
    ])
      .then(([total, products]) => {
        var totalPages = Math.ceil(total / limit);
        res.json({
          success: true,
          total,
          totalPages,
          currentPage: page,
          data: products,
        });
      })
      .catch((e) => {
        next(e);
      });
  } catch (error) {
    next(error);
  }
};

exports.deleteDriver = async (req, res, next) => {
  try {
    const { user } = req.body;
    await driversModel.updateOne({ user: user }, { deleted: true });
    await userModel.updateOne({ _id: user }, { status: "deleted" });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
exports.updateDriver = async (req, res, next) => {
  try {
    const { user, email, name, phone } = req.body;
    var update = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (phone) update.phone = phone;
    await driversModel.updateOne({ user: user }, update);
    await userModel.updateOne({ _id: user }, update);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.addSignature = async (req, res, next) => {
  try {
    const { imageBase64, title, archived } = req.body;
    const { _id: user } = req.user;
    const signature = await signaturesModel.create({
      user,
      imageBase64,
      title,
      archived,
    });
    res.json({ success: true, data: signature });
  } catch (error) {
    next(error);
  }
};

exports.getAllSignature = async (req, res, next) => {
  try {
    const { _id: user } = req.user;
    const data = await signaturesModel
      .find({ user, archived: false })
      .sort("-createdAt");
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
