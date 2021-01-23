const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const mongoose = require("mongoose");
const express = require("express");
require("../models/Payment");
const Payment = mongoose.model("Payment");
const Router = express.Router();

Router.post("/", (req, res) => {
    const { token, userID, name, totalPrice, orderID } = req.body;
    console.log(userID, name, totalPrice, orderID);
    if (!token) paymentSave(token, userID, name, totalPrice, orderID, res);
    else {
        stripe.charges
            .create({
                amount: 500,
                currency: "INR",
                description: "₹5 for 5 email credits",
                source: token.id,
            })
            .then((charge) => {
                console.log("charge");
                paymentSave(token, userID, name, totalPrice, orderID, res);
            })
            .catch((err) => console.log("err in chrge: ", err));
    }
});
const paymentSave = (token, userID, name, totalPrice, orderID, res) => {
    const payment = new Payment();
    payment.name = name;
    payment.totalAmount = totalPrice;
    payment._order = orderID;
    if (token) {
        payment.tokenId = token.id;
        payment.paymentType = "Online";
    }
    payment._user = userID;
    payment
        .save()
        .then((newUser) => {
            res.send({
                success: true,
                message: "Payment Completed",
            });
        })
        .catch((err) => {
            console.error("err: ", err);
            res.status(422).send(err.message);
        });
};
module.exports = Router;
