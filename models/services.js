const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const services = new Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["pay-by-university", "self-paid"], // "sponsor",
      index: true,
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
module.exports = mongoose.model("services", services);
