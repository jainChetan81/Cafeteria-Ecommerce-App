const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"),
    PORT = process.env.PORT || 5000,
    cookieSession = require("cookie-session"),
    cookieParser = require("cookie-parser"),
    cors = require("cors");

require("./models/User");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
    cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: "chetan-cookie" })
);
app.use(cookieParser());
const mongoURI =
    "mongodb+srv://chetan:abc123abc@cluster0.wf9cc.mongodb.net/server?retryWrites=true&w=majority";
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .catch((err) => console.log("err :", err));
mongoose.connection.on("connected", () => {
    console.log("mongodb connected");
});

app.use("/api/account", authRoutes);
app.use("/api/stripe", billingRoutes);
app.use("/api/order", orderRoutes);

if (process.env.NODE_ENV === "production") {
    //express will serve up production assest
    //like  our main.js or main.css files
    app.use(express.static("client/build"));

    //express will serve up index.js file if it doesn't recognizes the route
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log("server is running on port:", PORT);
});
