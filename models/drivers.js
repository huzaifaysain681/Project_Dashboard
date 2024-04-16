const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservationSchedule = new Schema(
  {
    dateFrom: {
      type: Date,
      index: true,
      default: null,
      required: true,
    },
    dateTo: {
      type: Date,
      index: true,
      default: null,
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "booking",
    },
  },
  { timestamps: true }
);
const drivers = new Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
    },
    username: {
      type: String,
      index: true,
      required: true,
    },
    email: {
      type: String,
      index: true,
    },
    phone: {
      type: String,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "user",
    },
    deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: ["available", "in-drive", "un-available"],
      default: "available",
      index: true,
    },
    reservations: [reservationSchedule],
  },
  {
    timestamps: true,
  }
);
// const passExpression = /(^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,})$/i;
module.exports = mongoose.model("drivers", drivers);
