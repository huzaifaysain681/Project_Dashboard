var express = require("express");
const passport = require("passport");
var router = express.Router();
var { usersController } = require("../controller");
const {
  verifyToken,
  verifyAdmin,
  verifyUserManager,
  verifyUser,
} = require("../midelwares/auth");
/* GET users listing. */
router.route("/detail").get(verifyToken, usersController.verifyUser);
router
  .route("/admin-signup")
  .post(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyUserManager,
    usersController.adminSignUp
  );
router.route("/signup").post(usersController.signup);
router
  .route("/driver-signup")
  .post(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyUserManager,
    usersController.driverSignup
  );
router
  .route("/login")
  .post(passport.authenticate("local"), usersController.login);

router
  .route("/driver")
  .patch(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyUserManager,
    usersController.deleteDriver
  )
  .get(verifyToken, usersController.getAllDrivers)
  .put(
    verifyToken,
    (req, res, next) => {
      var { user } = req;
      if (user.privileges.includes("user-managment")) {
        next();
      } else if (user.type == "driver" && req.body.user == user._id) {
        next();
      } else {
        err = new Error("You are not authorized as Data Manager!");
        err.status = 403;
        return next(err);
      }
    },
    usersController.updateDriver
  );
router
  .route("/signature")
  .post(verifyToken, verifyUser, usersController.addSignature)
  .get(verifyToken, verifyUser, usersController.getAllSignature);
module.exports = router;
