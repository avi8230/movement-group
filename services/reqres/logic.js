const axios = require("axios");
const User = require("../../models/UserModel"); // User model

const REQRES_API_URL = "https://reqres.in/api";

// Fetch users from ReqRes and store in MongoDB
const fetchAndStoreUsers = async () => {
    try {
        const response = await axios.get(`${REQRES_API_URL}/users?per_page=12`);
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

module.exports = {
    fetchAndStoreUsers
}