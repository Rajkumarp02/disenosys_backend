const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const crypto = require("crypto")


const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        unique: true,
        required:[true,"Please Enter UserName"]
    },
    userEmail:{
        type: String,
        unique: true,
        required:[true,"Please Enter UserEmail"]
    },
    password:{
        type: String,
        required:[true,"Please Enter Password"],
        select: false
    },
    resetPasswordToken:{
        type: String,
    },
    resetPasswordTokenExpire:{
       type: Date
    },
    reviews:{
        type: mongoose.Types.ObjectId,
        ref: "reviews"
    }
})


userSchema.methods.isValidatePassword = function(enPassword){

    return  bcrypt.compare(enPassword,this.password)
  
}

userSchema.methods.getJwtToken = function (){
    return  jwt.sign({id:this.id},process.env.JWT_SECRET)
 
 }

 userSchema.methods.getresetPasswordToken = function (){

    const token = crypto.randomBytes(20).toString('hex');

    
    this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');

    this.resetPasswordTokenExpire = Date.now() + 20 * 60 * 1000;

    return token

}

module.exports = mongoose.model("user",userSchema)