// Import Package
require("dotenv").config();
// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import Razorpay from "razorpay";
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();

// Database Connection
// import ConnectDB from "./database/connection.js";
// const ConnectDB = require("./database/connection.js");

// function ConnectDB(){
//     return mongoose.connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// }

// API Connection
// import generateOrder from "./API/generateOrder.js";
// import success from "./API/success.js";
const generateOrder = require("./API/generateOrder.js");
const success = require("./API/success.js");

const pGatewayInt = express();
pGatewayInt.use(express.json());
pGatewayInt.use(cors());
pGatewayInt.use(helmet());

// Application Routes

// http://localhost:5000/
pGatewayInt.get("/", (req, res) => {
  return res.json({
    Welcome: `To my backend Software for the Payment Gateway Integration.`,
  });
});
// http://localhost:5000/generateorder/order
pGatewayInt.use("/generateorder", generateOrder);
// http://localhost:5000/paymentsuccess/success
pGatewayInt.use("/paymentsuccess", success);

const PORT = process.env.PORT || "5000";

pGatewayInt.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Server Of Payment Gateway is Running....", PORT);
    })
    .catch((err) => {
      console.log("Server is Running but Database not get Connected.!!");
      console.log(err);
    });
});
