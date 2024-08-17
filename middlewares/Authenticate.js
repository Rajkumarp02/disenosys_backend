const UserModel = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/ErrorHandler")

exports.AuthenticateUser = async(req,res,next)=>{

    const token = req.headers['authorization']

    if(!token)
        {
            return next(new ErrorHandler("Login first to continue",401))
        }
    const bearer = token.split(' ')[1]

    const verified = jwt.verify(bearer,process.env.JWT_SECRET,{ignoreExpiration: true} )

    if(!verified)
    {
        return next(new ErrorHandler("Your Session Is Expired",401))
    }

    const user =  await UserModel.findById(verified.id)
    if(!user)
    {
        return next(new ErrorHandler("Not a User",401))
    }

    req.user = user
    next()
}