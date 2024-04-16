const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const booking = new Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
    },
    department: {
      type: String,
      index: true,
      required: true,
    },
    faculty: {
      type: String,
      index: true,
      required: true,
    },
    purpose: {
      type: String,
      index: true,
      required: true,
    },
    place: {
      type: String,
      index: true,
      required: true,
    },
    isMultipleDays: {
      type: Boolean,
      index: true,
      required: true,
    },

    dateFrom: {
      type: Date,
      index: true,
      default: null,
    },
    dateTo: {
      type: Date,
      index: true,
      default: null,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      index: true,
      required: true,
    },
    signature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "signatures",
      index: true,
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      index: true,
      required: true,
    },
    vehicleType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicletypes",
      index: true,
      required: true,
    },
    assignedVehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicles",
      default: null,
      index: true,
    },
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "drivers",
      default: null,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed"], // "sponsor",
      index: true,
      default: "pending",
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
// const passExpression = /(^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,})$/i;
module.exports = mongoose.model("booking", booking);
