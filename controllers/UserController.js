const CatchAsyncError = require("../middlewares/CatchAsyncError")
const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/ErrorHandler")
const SendToken = require("../utils/SendToken")
const nodemailer = require("nodemailer")
const SendEmail = require("../utils/SendEmail")
const crypto = require("crypto")


exports.RegisterUser = CatchAsyncError(async(req,res,next)=>{

    const {userName,userEmail,password} = req.body

    const hPassword = await bcrypt.hash(password,10)

    const user = await UserModel.create({userName: userName,
        userEmail: userEmail,
        password: hPassword
    }
    
    )
    if(!user)
    {
        return next(new ErrorHandler("Error in creating user",400))
    }
  SendToken(user,res,201)
})

exports.LoginUser = CatchAsyncError(async(req,res,next)=>{

    const {userEmail,userName,password} = req.body
    

//   const user = await UserModel.findOne({userEmail: userEmail}).select("+password")
   
//   const passwordv = await  user.isValidatePassword(password)

//   if(!passwordv)
//   {
//     console.log("Hello")
//   }

if(!userEmail && !userName)
{
    return next(new ErrorHandler("Username or useremail is required",400))
}

const user = await UserModel.findOne({$or:[{userEmail: userEmail},{userName: userName}]}).select("+password")

if(!user)
{
    return next(new ErrorHandler("No user Found",401))
}

    if(! await user.isValidatePassword(password))
    {
        return next(new ErrorHandler("Email or Password is Wrong",401))
    }
 

  SendToken(user,res,200)
})

exports.ResetLink = CatchAsyncError(async(req,res)=>{

    const {userEmail} = req.body

        const user = await UserModel.findOne({userEmail : userEmail})
        console.log(user)
        if(!user)
            {
                return next(new ErrorHandler("Not a valid user",401))
            }
        const token = await user.getresetPasswordToken()
    
        await user.save({validateBeforeSave: false})
    
        const resetUrl = `http://localhost:8000/api/v1/forgotPassword/${token}`;
       
    
          const message = {
              from: "sandbox.smtp.mailtrap.io",
              to: "",
              subject: "Reset Password",
              text: resetUrl
          }
      
        //  await SendEmail(message)
        
        res.json({resetUrl})
    
})

exports.ResetPassword = CatchAsyncError(async(req,res)=>{

        const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex')
    
    const user = await UserModel.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    })
    if(!user)
        {
            return next(new ErrorHandler("Your token is expired",400))
        }

    if(req.body.password != req.body.confirmPassword)
        {
            return next(new ErrorHandler("Password and Confirm Password Not Matched",400))
        }
    const hash = await bcrypt.hash(req.body.password,10)
    user.password = hash
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined
   await user.save({validateBeforeSave: false})
    res.json({
        message:"Hello World"
    })
})
