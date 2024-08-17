const CatchAsyncError = require("../middlewares/CatchAsyncError")
const ReviewModel = require("../models/ReviewModel")
const CourseModel = require("../models/CourseModel")

exports.addReview = CatchAsyncError(async(req,res,next)=>{

    const user = req.user
    const {id}= req.query
    const {review,star} = req.body
    

})

