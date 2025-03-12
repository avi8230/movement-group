const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const {
    register,
    login,
    logout,
    checkAuth
} = require("../controllers/authController");

const router = express.Router();

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", authenticateToken, checkAuth);

module.exports = router;
