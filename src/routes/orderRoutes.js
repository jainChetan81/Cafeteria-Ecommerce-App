const mongoose = require("mongoose");
const express = require("express");

require("../models/Order");
const Order = mongoose.model("Order");
const Router = express.Router();
// const requireAuth = require("../middlewares/requireAuth");
// Router.use(requireAuth);

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
Router.get("/", (req, res) => {
    const { userID } = req.query;
    console.log(userID);
    Order.find({ _user: userID })
        .then((orders) => {
            if (orders.length > 0) {
                res.send({
                    success: true,
                    orders,
                });
            }
        })
        .catch((err) => {
            console.error("err: ", err);
            res.status(422).send(err.message);
        });
});
module.exports = Router;
