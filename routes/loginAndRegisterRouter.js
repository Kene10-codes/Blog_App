const express = require("express")
const loginAndRegisterControllers = require("../controllers//loginAndRegisterControllers")

const router = express.Router()

router.post("/register", loginAndRegisterControllers.register_post)
router.get("/reg", loginAndRegisterControllers.register_get)
router.post("/login", loginAndRegisterControllers.login_post)
router.get("/log", loginAndRegisterControllers.login_get)

module.exports = router
