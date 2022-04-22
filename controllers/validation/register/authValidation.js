const joi = require("@hapi/joi")
const { validate } = require("@hapi/joi/lib/base")

const registerAuth = (data) => {
    const validationSchema = joi.object({
        username: joi.string().min(5).required(),
        fullname: joi.string().min(5).required(),
        email: joi.string().min(5).required().email(),
        password: joi.string().min(4).required()
    })
    return validationSchema.validate(data)
}

const loginAuth = (data) => {
    const validationSchema = joi.object({
        email: joi.string().min(5).required().email(),
        password: joi.string().min(4).required()
    })
    return validationSchema.validate(data)
}
module.exports.registerAuth = registerAuth
module.exports.loginAuth = loginAuth