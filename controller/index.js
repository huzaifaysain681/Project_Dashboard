const users = require("./users");
const vehicleTypes = require("./vehicleTypes");
const services = require("./services");
const vehicles = require("./vehicles");
const bookings = require("./bookings");

module.exports = {
  usersController: users,
  vehicleTypesController: vehicleTypes,
  servicesController: services,
  vehiclesController: vehicles,
  bookingsController: bookings,
};
