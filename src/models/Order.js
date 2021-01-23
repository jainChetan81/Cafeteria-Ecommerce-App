const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    tokenId: String,
    _user: { type: Schema.Types.ObjectId, ref: "User" },
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
