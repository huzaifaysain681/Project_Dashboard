var express = require("express");
var router = express.Router();
var users = require("./users");
var vehicleTypes = require("./vehicleTypes");
var services = require("./services");
var vehicles = require("./vehicles");
var bookings = require("./bookings");
/* GET home page. */
router.use("/user", users);
router.use("/vehicle-type", vehicleTypes);
router.use("/services", services);
router.use("/vehicles", vehicles);
router.use("/bookings", bookings);

module.exports = router;
