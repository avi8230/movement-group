const express = require("express");
const authenticateToken = require("../middleware/authMiddleware"); // Import JWT middleware

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

const router = express.Router();
// router.use(authenticateToken);

// User routes
router.get("/getUsers/:page", getUsers);
router.get("/getUser/:_id",authenticateToken, getUserById);
router.post("/createUser",authenticateToken, createUser);
router.put("/updateUser/:_id",authenticateToken, updateUser);
router.delete("/deleteUser/:_id",authenticateToken, deleteUser);

module.exports = router;
