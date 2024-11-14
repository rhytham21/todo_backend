const mongoose = require('mongoose');

//user Schema
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("User", userSchema);