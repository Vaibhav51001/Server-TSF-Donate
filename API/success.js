//  Import library
require("dotenv").config();
// import Razorpay from "razorpay";
// import express from "express";
// import crypto from "crypto";
const express = require("express");
const crypto = require("crypto");

// import { successModel } from "../database/successOrder";
const successModel = require("../database/successOrder");

const Router = express.Router();

Router.post("/success", async (req, res) => {
  try {
    // console.log(req.body);
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
    const shasum = crypto.createHmac("sha256", process.env.RAZOR_KEY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
    const paySuccess = await successModel.create(req.body);

    return res.json({
      Order: paySuccess,
      message: "User Was Added!!!",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = Router;
