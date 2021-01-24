module.exports = {
    mongoURI: process.env.MONGO_URI,
    cookie: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    jwtKey: process.env.JWT_KEY,
};
