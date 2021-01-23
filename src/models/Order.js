const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
    email: String,
    name: String,
    orgName: String,
    empId: String,
    mobile: String,
    image: String,
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    order: Object,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

mongoose.model("Order", paymentSchema);
