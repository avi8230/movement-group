const mongoose = require("mongoose");
const User = require("../models/UserModel");

// ✅ Retrieving all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

// ✅ Retrieving a user by _id
const getUserById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const user = await User.findById(req.params._id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

// ✅ Create a new user
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Failed to create user" });
    }
};

// ✅ Update user by _id
const updateUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: "Failed to update user" });
    }
};

// ✅ Delete user by _id
const deleteUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const deletedUser = await User.findByIdAndDelete(req.params._id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });

        res.status(204).send(); // No Content
    } catch (error) {
        res.status(400).json({ error: "Failed to delete user" });
    }
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
