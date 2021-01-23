const jwt = require("jsonwebtoken");

module.exports = (userId) => {
    return jwt.sign({ userId }, "CHETAN_SECRET_KEY");
};
