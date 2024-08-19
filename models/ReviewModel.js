const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    userName: {
        type: String,
        ref:"users",
        required:[true,"please Enter userName"]
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    courseName:{
        type: String,
        ref:"courses",
        required:[true,"please Enter CourseName"]
    },
    review:{
        type: String,
        required:[true,"Please Enter Review"]
    },
    star:{
        type: Number,
        required:[true,"Please Enter Star"]
    }
})

module.exports = mongoose.model("Review",reviewSchema)