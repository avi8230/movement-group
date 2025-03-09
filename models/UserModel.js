const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    idOfReqRes: Number,
    email: String,
    first_name: String,
    last_name: String,
    avatar: String,
});

module.exports = mongoose.model("User", UserSchema);
