const jwt = require("jsonwebtoken")
const Register = require("../models/register")

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.TOKEN_VALUE, (error, decodedToken) => {
            if(error) {
                console.log(error.message)
                res.redirect("/info/login")
            } else {
                console.log(decodedToken)
                next()
            }
        }) 
    } else {
        res.redirect("/info/login")
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.TOKEN_VALUE, async (error, decodedToken) => {
         if(error) {
             console.log(error.message)
             res.locals.user = null
             next()
         } else {
             console.log(decodedToken)
             let user = await Register.findById(decodedToken.id)
             res.locals.user = user
             next()
          }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }