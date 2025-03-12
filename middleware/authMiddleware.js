const jwt = require("jsonwebtoken");

// Middleware to verify JWT token from cookies
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies
    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid Token" });
    }
};

module.exports = authenticateToken;
