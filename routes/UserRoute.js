const express = require("express")
const { RegisterUser, LoginUser, ResetLink, ResetPassword } = require("../controllers/UserController")

const router = express.Router()

router.post("/user/register",RegisterUser)
router.post("/user/login",LoginUser)
router.post("/user/forgotPassword",ResetLink)
router.post("/user/changePassword",ResetPassword)

module.exports = router