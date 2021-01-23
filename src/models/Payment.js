const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
    RegistrationDate: {
        type: Date,
        default: Date.now(),
    },
    name: String,
    tokenId: String,
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    _order: { type: Schema.Types.ObjectId, ref: "Order" },
    totalAmount: {
        type: String,
        required: true,
    },
    paymentType: { type: "String", required: true, default: "COD" },
});

mongoose.model("Payment", paymentSchema);
