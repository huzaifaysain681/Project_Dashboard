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
const vehicles = new Schema(
  {
    color: {
      type: String,
      index: true,
      required: true,
    },
    plateNo: {
      type: String,
      index: true,
      required: true,
    },
    make: {
      type: String,
      index: true,
      required: true,
    },
    model: {
      type: String,
      index: true,
      required: true,
    },
    year: {
      type: String,
      index: true,
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "vehicletypes",
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
module.exports = mongoose.model("vehicles", vehicles);
