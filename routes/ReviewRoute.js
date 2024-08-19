const express = require("express")
const { addReview, updateReview, deleteReview } = require("../controllers/ReviewController")
const {AuthenticateUser } = require("../middlewares/Authenticate")
const router = express.Router()

router.post("/user/addReview",AuthenticateUser,addReview)
router.put("/user/updateReview",AuthenticateUser,updateReview)
router.delete("/user/deleteReview",AuthenticateUser,deleteReview)

module.exports = router