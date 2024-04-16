const mongoose = require("mongoose");
var passportloaclmongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const users = new Schema(
  {
    email: {
      type: String,
      index: true,
    },
    phone: {
      type: String,
      index: true,
    },
    phoneCode: {
      type: String,
      index: true,
      default: "+92",
    },
    username: {
      type: String,
      index: true,
    },
    type: {
      type: String,
      enum: ["user", "admin", "driver"],
      default: "user",
      index: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      ref: "drivers",
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    department: {
      type: String,
      required: true,
      index: true,
    },
    faculty: {
      type: String,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["deleted", "verified", "unverified"],
      default: "verified",
      index: true,
    },
    privileges: [
      {
        type: String,
        enum: ["data-entry", "user-managment"],
        index: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
// const passExpression = /(^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,})$/i;
users.plugin(passportloaclmongoose);
module.exports = mongoose.model("user", users);
