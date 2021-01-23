const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const mongoose = require("mongoose");
const express = require("express");
require("../models/Order");
const Order = mongoose.model("Order");
const Router = express.Router();

Router.post("/", (req, res) => {
    const { token, userID, name, totalPrice } = req.body;
    console.log(token, userID, name, totalPrice);
    stripe.charges
        .create({
            amount: 500,
            currency: "INR",
            description: "₹5 for 5 email credits",
            source: token.id,
        })
        .then((charge) => {
            console.log("charge");
            const order = new Order();
            order.name = name;
            order.totalAmount = totalPrice;
            order.tokenId = token.id;
            order.userID = userID;
            order
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
        })
        .catch((err) => console.log("err in chrge: ", err));
});
module.exports = Router;
