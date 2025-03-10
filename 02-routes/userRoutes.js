const express = require("express");
const authenticateToken = require("../04-middleware/authMiddleware"); // Import JWT middleware

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../03-controllers/userController");

const router = express.Router();
// router.use(authenticateToken);

// User routes
router.get("/getUsers/:page", getUsers);
router.get("/getUser/:_id", getUserById);
router.post("/createUser", createUser);
router.put("/updateUser/:_id", updateUser);
router.delete("/deleteUser/:_id", deleteUser);

module.exports = router;
