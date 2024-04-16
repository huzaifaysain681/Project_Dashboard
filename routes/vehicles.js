var express = require("express");
var router = express.Router();
var { vehiclesController } = require("../controller");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
  verifyDataManager,
} = require("../midelwares/auth");
/* GET users listing. */
router
  .route("/detail")
  .get(verifyToken, vehiclesController.getAll)
  .post(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyDataManager,
    vehiclesController.create
  )
  .patch(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyDataManager,
    vehiclesController.delete
  )
  .put(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyDataManager,
    vehiclesController.update
  );

module.exports = router;
