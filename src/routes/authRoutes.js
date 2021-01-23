const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const getToken = require("../middlewares/getToken");
const User = mongoose.model("User");
const Router = express.Router();

Router.post("/signup", (req, res) => {
    const { name, password } = req.body;
    console.log("name, password", name, password);
    if (!name || !password)
        return res
            .status(422)
            .send({ err: "Must provide an name and password" });
    const user = new User();
    user.name = name;
    user.password = password;
    user.save()
        .then((newUser) => {
            const token = getToken(user._id);
            res.send({
                success: true,
                user: { token, name: user.name },
                message: "Valid sign in",
            });
        })
        .catch((err) => {
            console.error("err: ", err);
            res.status(422).send(err.message);
        });
});

Router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password)
        return res.status(422).send({
            success: false,
            message: "Must provide an name and password",
        });

    User.findOne({ name })
        .then((user) => {
            if (!user) {
                console.log("name not found");
                res.status(422).send({
                    success: false,
                    message: "name not found",
                });
            }

            const matchingPassword = user.comparePassword(password);
            if (!matchingPassword) {
                console.log("Invalid Password:");
                res.status(422).send({
                    success: false,
                    message: "Invalid Password",
                });
            }
            if (matchingPassword) {
                const token = getToken(user._id);
                res.send({
                    success: true,
                    user: { token, name: user.name },
                    message: "Valid sign in",
                });
            }
        })
        .catch((err) => {
            console.log("err:", err);
            res.status(422).send({
                success: false,
                message: "Invalid Password",
            });
        });
});

Router.get("/logout", (req, res) => {
    console.log("logging out : " + user);
    req.session.destroy((err) => {
        if (err)
            return res.status(422).send({
                success: false,
                message: "Server Error in Logout",
            });
    });
});

module.exports = Router;
