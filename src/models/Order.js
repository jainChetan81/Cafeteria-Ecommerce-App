const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    tokenId: String,
    userID: String,
    totalAmount: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

mongoose.model("Order", orderSchema);
