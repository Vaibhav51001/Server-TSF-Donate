// import Mongoose from "mongoose";
const Mongoose = require("mongoose");

const genOrder = new Mongoose.Schema(
  {
    id: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    receipt: { type: String },
  },
  {
    timestamps: true,
  }
);

const genrateOrderModel = Mongoose.model("Order", genOrder);
module.exports = genrateOrderModel;