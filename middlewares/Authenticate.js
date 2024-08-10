const UserModel = require("../models/UserModel")
const jwt = require("jsonwebtoken")

exports.AuthenticateUser = async(req,res)=>{

    const token = req.headers['Authorization']

    if(!token)
        {
            return next(new ErrorHandler("Login first to continue",401))
        }
    const bearer = token.split(' ')[1]

    const verified = jwt.verify(accessToken,process.env.JWT_SECRET,{ignoreExpiration: true} )

    if(!verified)
    {
        return next(new ErrorHandler("Your Session Is Expired",401))
    }

    const user =  await userModel.findById(verified.id)
    if(!user)
    {
        return next(new ErrorHandler("Not a User",401))
    }

    req.user = user
    next()
}