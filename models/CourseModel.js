const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required:[true,"Please Enter CourseName"]
    },
    description:{
        type: String
    },
    category:[
        {
        type: String,
        required:[true,"Please Enter Course Category"]
        }
    ],
    members:[
        {
            type: mongoose.Types.ObjectId,
            ref:"users"
        }
    ],
    reviews:[
        {
   
        }
    ],
    price:{
        type: Number,
        required:[true,"Please Enter price"]
    },
    duration:{
        type: String
    },

    detailsDescription:[
        {
            
        }
    ],
    imagePath:{
        type: String
    },
    noOfLessons:{
        type: Number
    }



})

module.exports = mongoose.model("Course",courseSchema)