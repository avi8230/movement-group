// Required modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
require("./services/mongodb/db"); // Connect to database
const { fetchAndStoreUsers } = require("./services/reqres/reqres");

// Create an Express app
const app = express();
app.use(cors({
    origin: ["http://localhost:3000", "https://www.google.com", "https://www.facebook.com"],
    credentials: true // Enable credentials - cookies
}));
app.use(express.json());
app.use(cookieParser()); // Enable cookie support

// Fetch users from ReqRes and store in MongoDB
fetchAndStoreUsers();

// Routes
app.use("/api/user", userRoutes); // User routes
app.use("/api/auth", authRoutes); // Authentication routes

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
