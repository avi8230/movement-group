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
router.use(authenticateToken);

router.get("/getUsers/:page", getUsers);
router.get("/getUser/:_id", getUserById);
router.post("/createUser", createUser);
router.put("/updateUser/:_id", updateUser);
router.delete("/deleteUser/:_id", deleteUser);

module.exports = router;
