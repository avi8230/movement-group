const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// User schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Invalid email address"]
    },
    password: {
        type: String,
        // required: true,
        minlength: 8,
        validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value); // e.g. 1234Abcd!
            },
            message: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
        }
    },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    avatar: String,
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Hash password before saving the user
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", UserSchema);
