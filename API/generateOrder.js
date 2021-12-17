//  Import library
require("dotenv").config();
// import Razorpay from "razorpay";
// import express from "express";
// import uniqid from 'uniqid';
const Razorpay = require("razorpay");
const express = require("express");
const uniqid = require("uniqid");

// import { genrateOrderModel } from "../database/generateOrder";
const genrateOrderModel = require("../database/generateOrder");

// Razorpay instance
var instance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

const Router = express.Router();

Router.post("/order", (req, res) => {
  try {
    const donatePrice = 500;
    var options = {
      amount: donatePrice * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: uniqid(),
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const newOrder = genrateOrderModel.create(order);
      return res.status(200).send(order);
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = Router;
