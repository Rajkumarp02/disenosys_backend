const express = require("express")

const app = express()
const dotenv = require("dotenv")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")
const ejs = require("ejs")


dotenv.config({path : path.join(__dirname,"./.env")})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongodb Connected")
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
  
app.use(cors())
app.use(
    cors({
      origin:"*",
    })
  );
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


  app.get("/api/v1/forgotPassword/:token",(req,res)=>{
    const token = req.params.token
    res.render("index",{token})
  })
const UserRoute = require("./routes/UserRoute")
const CourseRoute = require("./routes/CourseRoute")
const ReviewRoute = require("./routes/ReviewRoute")
app.use("/api/v1",UserRoute)
app.use("/api/v1",CourseRoute)
app.use("/api/v1",ReviewRoute)
module.exports = app