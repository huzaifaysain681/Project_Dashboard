var express = require("express");
var router = express.Router();
var { vehicleTypesController } = require("../controller");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
  verifyDataManager,
} = require("../midelwares/auth");
/* GET users listing. */
router
  .route("/detail")
  .get(verifyToken, vehicleTypesController.getAll)
  .post(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyDataManager,
    vehicleTypesController.create
  )
  .patch(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyDataManager,
    vehicleTypesController.delete
  )
  .put(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyDataManager,
    vehicleTypesController.update
  );

module.exports = router;
