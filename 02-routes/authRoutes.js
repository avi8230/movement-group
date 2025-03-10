const express = require("express");

const {
    register,
    login,
    logout
} = require("../03-controllers/authController");

const router = express.Router();

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
