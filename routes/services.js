var express = require("express");
var router = express.Router();
var { servicesController } = require("../controller");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
  verifyDataManager,
} = require("../midelwares/auth");
/* GET users listing. */
router
  .route("/detail")
  .get(verifyToken, servicesController.getAll)
  .post(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyDataManager,
    servicesController.create
  )
  .patch(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyDataManager,
    servicesController.delete
  )
  .put(
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyDataManager,
    servicesController.update
  );

module.exports = router;
