require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const connectDB = require("./config/db"); //Connect to database
const User = require("./models/UserModel"); // User model
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors({ origin: ["https://localhost", "https://www.google.com", "https://www.facebook.com"] }));
app.use(express.json());

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
connectDB().then(fetchAndStoreUsers);

app.use("/api", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
