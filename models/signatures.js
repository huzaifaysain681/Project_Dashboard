const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signatures = new Schema(
  {
    title: {
      type: String,
      index: true,
      required: true,
    },
    imageBase64: {
      type: String,
      required: true,
    },

    archived: {
      type: Boolean,
      default: false,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// const passExpression = /(^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,})$/i;
module.exports = mongoose.model("signatures", signatures);
