const {
  bookingModel,
  servicesModel,
  vehicleTypesModel,
  signaturesModel,
  vehiclesModel,
  driversModel,
  userModel,
  emailsModel,
} = require("../models");
const {
  Types: { ObjectId },
} = require("mongoose");
const ErrorResponse = require("../utils/ErrorResponse");
const moment = require("moment");
const {
  sendMessageAdminAboutNewRequest,
  sendUpdateBookingMessageToPhoneNumber,
  bookingDriverAssignMessage,
  bookingVehicleAssingMessage,
} = require("../midelwares/nodeamailer");
exports.create = async (req, res, next) => {
  var {
    service,
    vehicleType,
    name,
    department,
    faculty,
    purpose,
    place,
    isMultipleDays,
    date,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
    signature,
  } = req.body;
  try {
    const { _id: user, username } = req.user;
    var serviceExist = await servicesModel.exists({
      _id: service,
      deleted: false,
    });
    if (!serviceExist || !service)
      throw new ErrorResponse("service not found!", 400);
    var signatureExists = await signaturesModel.exists({
      _id: signature,
      user,
    });
    if (!signatureExists || !signature)
      throw new ErrorResponse("signature not found!", 400);
    var vehicleTypeExists = await vehicleTypesModel.exists({
      _id: vehicleType,
      deleted: false,
    });
    if (!vehicleTypeExists || !vehicleType)
      throw new ErrorResponse("vehicle type not found!", 400);
    var validationObj = {
      faculty,
      department,
      name,
      purpose,
      place,
    };
    Object.keys(validationObj).map((key) => {
      if (!validationObj[key])
        throw new ErrorResponse("Please enter " + key + "!", 400);
    });
    if (isMultipleDays) {
      if (moment(dateFrom).isValid() && moment(dateTo).isValid()) {
        dateFrom = moment(dateFrom).toDate();
        dateTo = moment(dateTo).toDate();
      } else {
        throw new ErrorResponse("Please enter Datefrom and Dateto!", 400);
      }
    } else {
      if (
        moment(timeFrom).isValid() &&
        moment(timeTo).isValid() &&
        moment(date).isValid()
      ) {
        var absoluteDate = moment(date).format("DD/MM/YYYY");
        absoluteTimeFrom = moment(timeFrom).format("HH:mm");
        absolutetimeTo = moment(timeTo).format("HH:mm");

        dateFrom = moment(
          absoluteDate + " " + absoluteTimeFrom,
          "DD/MM/YYYY HH:mm"
        ).toDate();
        dateTo = moment(
          absoluteDate + " " + absolutetimeTo,
          "DD/MM/YYYY HH:mm"
        ).toDate();
        // console.log(moment(dateTo).format("DD/MM/YYYY HH:mm"));
        // console.log(moment(dateFrom).format("DD/MM/YYYY HH:mm"));
      } else {
        throw new ErrorResponse("Please enter Date, Timefrom and Timeto!", 400);
      }
    }
    const booking = await bookingModel.create({
      service,
      vehicleType,
      name,
      department,
      faculty,
      purpose,
      place,
      isMultipleDays,
      dateFrom,
      dateTo,
      signature,
      user,
    });
    sendMessageAdminAboutNewRequest(username, dateFrom);
    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  const { name, _id, type, status } = req.body;
  try {
    var update = {};
    if (name) update.name = name;
    if (type) update.type = type;
    if (status) update.status = status;
    const updat = await bookingModel.updateOne({ _id }, update);
    res.json({ success: true, booking: updat });
    var booking = await bookingModel.findOne({ _id });
    var user = await userModel.findOne({ _id: booking.user });
    if (status)
      sendUpdateBookingMessageToPhoneNumber(
        status,
        user.phoneCode + user.phone,
        user.username
      );
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
  const { _id } = req.body;
  try {
    await bookingModel.updateOne({ _id }, { deleted: true });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const { _id: user, type } = req.user;
    var { q, page, limit, status } = req.query;
    page = Number(page);
    limit = Number(limit);
    if (!limit) limit = 10;
    if (!page) page = 1;
    var query = { deleted: false };
    if (type == "user") {
      query.user = user;
      query.$or = [{ status: "pending" }, { status: "accepted" }];
    }
    if (q) query.name = { $regex: q, $options: "i" };
    if (status) query.status = status;
    console.log(query);
    var data;
    if (type == "user") {
      data = await bookingModel
        .find(query)
        .populate("service")
        .populate("vehicleType")
        .populate("assignedVehicle")
        .populate("assignedDriver");
      res.json({ success: true, data });
    } else
      Promise.all([
        bookingModel.find(query).count(),
        bookingModel
          .find(query)
          .populate("user")
          .populate("signature")
          .populate("service")
          .populate("vehicleType")
          .populate("assignedVehicle")
          .populate("assignedDriver")
          .skip((page - 1) * limit)
          .limit(limit),
      ])
        .then(([total, data]) => {
          var totalPages = Math.ceil(total / limit);
          res.json({
            success: true,
            total,
            totalPages,
            currentPage: page,
            data,
          });
        })
        .catch((e) => {
          next(e);
        });
  } catch (error) {
    next(error);
  }
};
exports.getPastBookings = async (req, res, next) => {
  const { _id: user } = req.user;
  var { q, page, limit, status } = req.query;
  // if(status&&status!="declined")
  // return next(new Error("Plea"))
  page = Number(page);
  limit = Number(limit);
  if (!limit) limit = 10;
  if (!page) page = 1;
  var query = { deleted: false };
  query.user = user;
  query.$or = [{ status: "pending" }, { status: "accepted" }];
  if (q) query.name = { $regex: q, $options: "i" };
  if (status) query.status = status;
  Promise.all([
    bookingModel.find(query).count(),
    bookingModel
      .find(query)
      .populate("service")
      .populate("vehicleType")
      .populate("assignedVehicle")
      .populate("assignedDriver")
      .skip((page - 1) * limit)
      .limit(limit),
  ])
    .then(([total, data]) => {
      var totalPages = Math.ceil(total / limit);
      res.json({
        success: true,
        total,
        totalPages,
        currentPage: page,
        data,
      });
    })
    .catch((e) => {
      next(e);
    });
};
exports.getVehiclesBetweenTimeFrame = async (req, res, next) => {
  try {
    var { type } = req.user;
    var { dateFrom, dateTo, vehicleType } = req.body;
    if (!moment(dateFrom).isValid() && !moment(dateTo).isValid())
      throw new Error("Please enter dateFrom and dateTo!");
    var startOf = moment(dateFrom).toDate();
    var endOf = moment(dateTo).toDate();
    var matchOption = {};
    if (vehicleType) matchOption.type = ObjectId(vehicleType);
    var data = await vehiclesModel.aggregate([
      {
        $match: {
          ...matchOption,
          status: { $ne: "un-available" },
          deleted: false,
          $nor: [
            {
              "reservations.dateFrom": {
                $lte: endOf,
                $gte: startOf,
              },
            },
            {
              "reservations.timeTo": {
                $lte: endOf,
                $gte: startOf,
              },
            },
          ],
        },
      },
    ]);
    var response = {};
    if (type == "user") response.success = data.length > 0;
    else {
      response = { success: true, data };
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
};
exports.getUsersBetweenTimeFrame = async (req, res, next) => {
  try {
    var { type } = req.user;
    var { dateFrom, dateTo } = req.body;
    if (!moment(dateFrom).isValid() && !moment(dateTo).isValid())
      throw new Error("Please enter dateFrom and dateTo!");
    var startOf = moment(dateFrom).toDate();
    var endOf = moment(dateTo).toDate();
    var data = await driversModel.aggregate([
      {
        $match: {
          status: { $ne: "un-available" },
          deleted: false,
          $nor: [
            {
              "reservations.dateFrom": {
                $lte: endOf,
                $gte: startOf,
              },
            },
            {
              "reservations.timeTo": {
                $lte: endOf,
                $gte: startOf,
              },
            },
          ],
        },
      },
    ]);
    var response = {};
    if (type == "user") response.success = data.length > 0;
    else {
      response = { success: true, data };
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
};
exports.assignDriver = async (req, res, next) => {
  try {
    var { _id, driverId } = req.body;
    var exists = await driversModel.exists({ _id: driverId });
    if (!exists) throw new Error("Please enter valid driverId");
    var booking = await bookingModel.findOne({ _id });
    if (!booking) throw new Error("Please enter valid booking id");
    var update = await bookingModel.updateOne(
      { _id },
      { assignedDriver: driverId }
    );
    if (booking.assignedDriver) {
      await driversModel.updateOne(
        { _id: booking.assignedDriver },
        { $pull: { reservations: { booking: _id } } }
      );
    }

    await driversModel.updateOne(
      { _id: driverId },
      {
        $push: {
          reservations: {
            dateFrom: booking.dateFrom,
            dateTo: booking.dateTo,
            booking: _id,
          },
        },
      }
    );
    res.json({ success: true });
    var _b = await bookingModel.findOne({ _id });
    var user = await userModel.findOne({ _id: _b.user });
    if (_b.assignedVehicle)
      bookingDriverAssignMessage(user.phoneCode + user.phone, user.username);
  } catch (error) {
    next(error);
  }
};
exports.assignVehicle = async (req, res, next) => {
  try {
    var { _id, vehicleId } = req.body;
    var exists = await vehiclesModel.findOne({ _id: vehicleId });
    if (!exists) throw new Error("Please enter valid vehicleId");
    var booking = await bookingModel.findOne({ _id });
    if (!booking) throw new Error("Please enter valid booking id");
    var update = await bookingModel.updateOne(
      { _id },
      { assignedVehicle: vehicleId }
    );
    if (booking.assignedVehicle) {
      await vehiclesModel.updateOne(
        { _id: booking.assignedVehicle },
        { $pull: { reservations: { booking: _id } } }
      );
    }

    await vehiclesModel.updateOne(
      { _id: vehicleId },
      {
        $push: {
          reservations: {
            dateFrom: booking.dateFrom,
            dateTo: booking.dateTo,
            booking: _id,
          },
        },
      }
    );
    res.json({ success: true });
    var _b = await bookingModel.findOne({ _id });
    var user = await userModel.findOne({ _id: _b.user });
    if (_b.assignedDriver)
      bookingVehicleAssingMessage(
        user.phoneCode + user.phone,
        user.username,
        exists
      );
  } catch (error) {
    next(error);
  }
};

exports.createEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const data = await emailsModel.create({ email });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
exports.deleteEmail = async (req, res, next) => {
  const { _id } = req.body;
  try {
    await emailsModel.updateOne({ _id }, { deleted: true });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
exports.getAllEmail = async (req, res, next) => {
  try {
    const { q } = req.query;
    var query = { deleted: false };
    if (q) query.name = { $regex: q, $options: "i" };
    var data = await emailsModel.find(query);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
