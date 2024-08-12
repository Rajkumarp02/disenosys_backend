const express = require("express")
const { createCourse, getAllCourses, getByCategories } = require("../controllers/CourseController")
const {CourseImageUpload} = require("../middlewares/Course_Image")

const router = express.Router()

router.route("/course/createCourse").post(createCourse)
router.route("/getAllCourses").get(getAllCourses)
router.route("/getCourseBycategory").get(getByCategories)
module.exports = router
