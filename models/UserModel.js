const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: Number, // ID of ReqRes API
    email: String,
    first_name: String,
    last_name: String,
    avatar: String,
});

module.exports = mongoose.model("User", UserSchema);
