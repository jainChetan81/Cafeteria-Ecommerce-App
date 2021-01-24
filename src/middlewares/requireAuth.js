const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    console.log("authorization", authorization);
    if (!authorization)
        res.status(401).send({ error: "You must be logged in" });
    if (authorization) {
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, keys.jwtKey, async (err, payload) => {
            if (err) res.status(401).send({ error: "You must be logged in" });
            const { userId } = payload;
            const user = await User.findById(userId);
            req.user = user;
            next();
        });
    }
};
