const mongoose = require("mongoose")
const Schema = mongoose.Schema

const registerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

const Register = mongoose.model("Register", registerSchema)
module.exports = Register