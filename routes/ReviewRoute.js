const express = require("express")
const { addReview } = require("../controllers/ReviewController")
const {AuthenticateUser } = require("../middlewares/Authenticate")
const router = express.Router()

router.put("/user/addReview",AuthenticateUser,addReview)

module.exports = router