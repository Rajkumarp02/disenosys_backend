const CatchAsyncError = require("../middlewares/CatchAsyncError")
const ReviewModel = require("../models/ReviewModel")
const CourseModel = require("../models/CourseModel")
const ErrorHandler = require("../utils/ErrorHandler")

exports.addReview = CatchAsyncError(async(req,res,next)=>{

    const user = req.user
    const {id}= req.query
    const {review,star} = req.body
    console.log(req.body)


    const course = await CourseModel.findById(id)
    const addReview = await ReviewModel.create({
        userName: user.userName,
        courseName : course.courseName,
        review: review,
        star: star,
        userId: user.id
    })

    course.reviews.push(addReview)

    await course.save()
    res.json({
        success: true,
        addReview,
        course
    })
})

exports.updateReview = CatchAsyncError(async(req,res,next)=>{

    const user = req.user
    const {id} = req.query
    
    const review = await ReviewModel.findByIdAndUpdate(id,req.body,{new: true,runValidators: false})

    if(!review)
    {
        return next(new ErrorHandler ("Error in updating tasks",500))
    }

    res.status(200).json({
        success: true,
        review
    })

})

exports.deleteReview = CatchAsyncError(async(req,res)=>{

    // const user = req.user
    const {id} = req.query
    const review = await ReviewModel.findByIdAndDelete(id)

    if(!review)
    {
        return next(new ErrorHandler("Error in Deleting Reviews",400))
    }

    res.status(200).json({
        success: true,
        message: "Review Deleted",
        review
    })
})