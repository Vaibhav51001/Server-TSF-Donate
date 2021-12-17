// import Mongoose from "mongoose";
const Mongoose = require("mongoose");

const successOrder = new Mongoose.Schema(
  {
    orderCreationId: { type: String, required: true },
    razorpayPaymentId: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpaySignature: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const successModel = Mongoose.model("SuccessOrder", successOrder);
module.exports = successModel;