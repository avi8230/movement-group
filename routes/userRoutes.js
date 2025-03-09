const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

router.get("/getUsers/:page", getUsers);
router.get("/getUser/:_id", getUserById);
router.post("/createUser", createUser);
router.put("/updateUser/:_id", updateUser);
router.delete("/deleteUser/:_id", deleteUser);

module.exports = router;
