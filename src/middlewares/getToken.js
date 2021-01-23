const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (userId) => {
    return jwt.sign({ userId }, keys.jwtKey);
};
