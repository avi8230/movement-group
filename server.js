require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const User = require("./01-models/UserModel"); // User model
const userRoutes = require("./02-routes/userRoutes");
const authRoutes = require("./02-routes/authRoutes");
const cookieParser = require("cookie-parser");
require("./05-config/db"); //Connect to database


const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://www.google.com", "https://www.facebook.com"],
    credentials: true // Enable credentials - cookies
}));
app.use(express.json());
app.use(cookieParser()); // Enable cookie support

const fetchAndStoreUsers = async () => {
    try {
        const response = await axios.get("https://reqres.in/api/users?per_page=12");
        const users = response.data.data;

        // Check if the users already exist
        const existingUsers = await User.find();
        if (existingUsers.length === 0) {
            await User.insertMany(users);
            console.log("✅ Users fetched from ReqRes and saved to MongoDB");
        } else {
            console.log("ℹ️ Users already exist in MongoDB. Skipping fetch.");
        }
    } catch (error) {
        console.error("❌ Error fetching users from ReqRes:", error);
    }
};

// Connecting to the database then retrieving and saving users
// connectDB().then(
fetchAndStoreUsers()

app.use("/api/user", userRoutes); // User routes
app.use("/api/auth", authRoutes); // Authentication routes

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
