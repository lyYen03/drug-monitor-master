const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// session
app.use(session({
    secret: process.env.SESSION_SECRET || "keyboardcat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// make user available to views
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    next();
});

// routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const supplierRoutes = require("./routes/suppliers");
const productRoutes = require("./routes/products");
const swaggerSetup = require("./swagger/swagger");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

// swagger
swaggerSetup(app);

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));