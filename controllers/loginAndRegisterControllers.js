const Register = require("../models/register")
const { registerAuth, loginAuth } = require("../controllers/validation/register/authValidation")
const bcrypt = require("bcryptjs")


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
  .then(data => res.redirect("/info/login"))
  .catch(error => console.log(error))
}

const login_get = (req, res) => {
    res.render("info/login", { title: "Login" })
}

const login_post = async (req, res) => {
    const { error } = loginAuth(req.body)
    if (error) return res.redirect("/info/login")
    const appUser = await Register.findOne({
        email: req.body.email
    })
    if(!appUser) return res.status(400).send("Cannot find email")
    const correctPassword = await bcrypt.compare(req.body.password, appUser.password)
    if(!correctPassword) return res.redirect("/info/login")
    res.redirect("/blogs")
}

module.exports = {
    register_get,
    register_post,
    login_get,
    login_post
}