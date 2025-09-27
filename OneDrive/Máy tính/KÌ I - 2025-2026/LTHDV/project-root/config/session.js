const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

module.exports = session({
    secret: process.env.SESSION_SECRET || 'mysecret', // key bí mật
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // trỏ tới database MongoDB
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 ngày
        httpOnly: true
    }
});