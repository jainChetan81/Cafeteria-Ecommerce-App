const mongoose = require("mongoose");
const express = require("express");
require("../models/Order");
const Order = mongoose.model("Order");
const Router = express.Router();

Router.post("/", (req, res) => {
    const { formData, userID, totalPrice } = req.body;
    console.log(formData, userID, totalPrice);

    console.log("order");
    const order = new Order();
    order.email = formData.email;
    order.name = formData.name;
    order.orgName = formData.orgName;
    order.empId = formData.empId;
    order.mobile = formData.mobile;
    order.totalAmount = totalPrice;
    order._user = userID;
    order
        .save()
        .then((newOrder) => {
            res.send({
                success: true,
                message: "Payment Completed",
                paymentId: newOrder._id,
            });
        })
        .catch((err) => {
            console.error("err: ", err);
            res.status(422).send(err.message);
        });
});
module.exports = Router;