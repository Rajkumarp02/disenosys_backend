const nodemailer = require("nodemailer")

const sendMail =async (Options)=>{

    const transport = nodemailer.createTransport({
        auth:{
            user:"",
            pass: ""
            }
    })

    const mail = await transport.sendMail(Options)
     
    if(mail)
    {
        return true
    }

    return false
}

module.exports = sendMail