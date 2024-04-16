const user = require("./user");
const vehicleTypes = require("./vehicleTypes");
const services = require("./services");
const vehicles = require("./vehicles");
const drivers = require("./drivers");
const signatures = require("./signatures");
const booking = require("./booking");
const emails = require("./emails");

module.exports = {
  userModel: user,
  vehicleTypesModel: vehicleTypes,
  servicesModel: services,
  driversModel: drivers,
  vehiclesModel: vehicles,
  signaturesModel: signatures,
  bookingModel: booking,
  emailsModel: emails,
};
