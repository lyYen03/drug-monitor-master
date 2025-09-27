// controllers/authController.js
const User = require("../models/User");

// ==== Render UI ====
exports.getLogin = (req, res) => res.render("login", { error: null });
exports.getRegister = (req, res) => res.render("register", { error: null });
exports.getForgot = (req, res) => res.render("forgot", { message: null });

// ==== Register ====
exports.postRegister = async(req, res) => {
    try {
        const { username, password, email, phone } = req.body;
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) return res.render("register", { error: "Username or email already exists." });

        const user = new User({ username, password, email, phone });
        await user.save();
        res.redirect("/auth/login");
    } catch (err) {
        res.render("register", { error: err.message });
    }
};

// ==== Login ====
exports.postLogin = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.render("login", { error: "User not found." });

        const ok = await user.comparePassword(password);
        if (!ok) return res.render("login", { error: "Invalid password." });

        // Tạo session
        req.session.user = { id: user._id, username: user.username, email: user.email };

        // Nếu là API request, trả JSON
        if (req.originalUrl.startsWith("/api") || req.headers.accept.includes("application/json")) {
            return res.json({ message: "Login success", user: req.session.user });
        }

        res.redirect("/");
    } catch (err) {
        res.render("login", { error: err.message });
    }
};

// ==== Logout ====
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            // Nếu API request
            if (req.originalUrl.startsWith("/api") || req.headers.accept.includes("application/json")) {
                return res.status(500).json({ message: "Logout failed." });
            }
            return res.status(500).send("Logout failed.");
        }

        res.clearCookie("connect.sid"); // Xoá cookie session

        // Nếu API request
        if (req.originalUrl.startsWith("/api") || req.headers.accept.includes("application/json")) {
            return res.json({ message: "Logged out successfully" });
        }

        res.redirect("/auth/login");
    });
};