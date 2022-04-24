const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const registerSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
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

registerSchema.statics.login = async (email, password) => {
    const user = await this.findOne({ email })
    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user
        }
        throw Error("incorrect password")
    }
    throw Error("incorrect email")
}

const Register = mongoose.model("Register", registerSchema)
module.exports = Register