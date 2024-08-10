const express = require("express")
const { RegisterUser, LoginUser } = require("../controllers/UserController")

const router = express.Router()

router.post("/user/register",RegisterUser)
router.post("/user/login",LoginUser)

module.exports = router