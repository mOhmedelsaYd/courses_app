const mongoose = require('mongoose');
const validator = require('validator');
const roleUser = require("../utils/role");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    secondName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true,
        validate: [validator.isEmail, 'filed must be a valid email address']
    },
    password: {
        type: String,
        required: true,

    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [roleUser.USER, roleUser.ADMIN, roleUser.MANGER],
        default: roleUser.USER
    },
    avatar: {
        type: String,
        default: 'uploads/avatardefault_92824.png'
    }

})


module.exports = mongoose.model("user", userSchema);