const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

// Register new user and store JWT in HttpOnly cookie
const register = async (req, res) => {
    try {
        const { email, password, first_name, last_name, avatar } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "User already exists" });

        // Create new user
        user = new User({ email, password, first_name, last_name, avatar });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Store token in HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevent access from JavaScript
            secure: process.env.NODE_ENV === "production", // Secure cookie in production
            sameSite: "Strict", // Prevent CSRF attacks
            maxAge: 3600000, // 1 hour
        });

        res.status(201).json({
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar
        });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
};

// Login user and store JWT in HttpOnly cookie
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Store token in HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevent access from JavaScript
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "Strict", // Prevent CSRF attacks
            maxAge: 3600000, // 1 hour
        });

        res.json({
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar
        });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

// Logout user by clearing the JWT cookie
const logout = (req, res) => {
    res.clearCookie("token"); // Remove the token cookie
    res.json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };
