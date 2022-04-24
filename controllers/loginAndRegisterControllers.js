const jwt = require("jsonwebtoken")
const Register = require("../models/register")
const { registerAuth, loginAuth } = require("../controllers/validation/register/authValidation")
const bcrypt = require("bcryptjs")


//create token 
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_VALUE, {
        expiresIn: maxAge
    })
}
const register_get = (req, res) => {
    res.render("info/register", { title: "Register" })
}

const register_post = async (req, res) => {
 const { error } = registerAuth(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const existingEmail = await Register.findOne({
      email: req.body.email
  })
  if(existingEmail) return res.status(400).send("Email already exist")

  const saltedPassword = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, saltedPassword)
  
  const register = new Register({
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword
  })
  register.save()
  .then(data => {
      const token = createToken(register._id)
      res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true})
      res.redirect("/info/login")
  })
  .catch(error => console.log(error))
}

const login_get = (req, res) => {
    res.render("info/login", { title: "Login" })
}

const login_post = async (req, res) => {
    const { error } = loginAuth(req.body)
    if (error) return res.redirect("/info/login")
    const { email, password} = req.body
    const user = Register.login(email, password)
    const token = createToken(user._id)
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true})
    res.redirect("/blogs")
}

const logout_get = (req, res) => {
    res.cookie("jwt", "" , { maxAge: 1 })
    res.redirect("/blogs")
}

module.exports = {
    register_get,
    register_post,
    login_get,
    login_post,
    logout_get
}