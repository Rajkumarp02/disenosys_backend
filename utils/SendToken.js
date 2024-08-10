const SendToken = (user,res,statusCode)=>{

    const token = user.getJwtToken()

    const options={
        // expires: new Date(Date.now() +  7*24 *60 * 60 * 1000 ),
        httpOnly: true,
        secure: true
    }

    res.status(statusCode).cookie('token',token,options).json({
        sucess: true,
        message: "Token Is Sent",
        token,
        user
    })
}

module.exports = SendToken