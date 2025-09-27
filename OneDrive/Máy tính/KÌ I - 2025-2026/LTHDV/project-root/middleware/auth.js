// middleware/auth.js
exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.id) {
        return next();
    }

    // Nếu là request API (Postman), trả JSON
    if (req.originalUrl.startsWith("/api") || req.headers.accept.includes("application/json")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Nếu là request UI, redirect về login
    return res.redirect("/auth/login");
};