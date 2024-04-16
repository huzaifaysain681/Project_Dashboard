var express = require("express");
var router = express.Router();
var { bookingsController } = require("../controller");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
  verifyDataManager,
} = require("../midelwares/auth");
/* GET users listing. */
router
  .route("/detail")
  .post(verifyToken, verifyUser, bookingsController.create)
  .put(verifyToken, verifyUser, verifyAdmin, bookingsController.update)
  .get(verifyToken, verifyUser, bookingsController.getAll);
router
  .route("/get-past")
  .get(verifyToken, verifyUser, bookingsController.getPastBookings);
router
  .route("/get-available-vehicle")
  .post(
    verifyToken,
    verifyUser,
    bookingsController.getVehiclesBetweenTimeFrame
  );
router
  .route("/get-available-drivers")
  .post(verifyToken, verifyUser, bookingsController.getUsersBetweenTimeFrame);
router
  .route("/assign-vehicle")
  .post(verifyToken, verifyUser, verifyAdmin, bookingsController.assignVehicle);
router
  .route("/assign-driver")
  .post(verifyToken, verifyUser, verifyAdmin, bookingsController.assignDriver);

  router
    .route("/email")
    .post(verifyToken, verifyUser, bookingsController.createEmail)
    .put(verifyToken, verifyUser, verifyAdmin, bookingsController.deleteEmail)
    .get(verifyToken, verifyUser, bookingsController.getAllEmail);
module.exports = router;
