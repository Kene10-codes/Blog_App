const express = require("express")
const loginAndRegisterControllers = require("../controllers//loginAndRegisterControllers")

const router = express.Router()

router.get("/register", loginAndRegisterControllers.register_get)
router.post("/register", loginAndRegisterControllers.register_post)
router.get("/login", loginAndRegisterControllers.login_get)
router.post("/login", loginAndRegisterControllers.login_post)

module.exports = router
