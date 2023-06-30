

const { sendMail } = require('./mailer');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
require('dotenv').config();

function generateOTP(){
    let otp = ""
    for(let i=0;i<4;i++){
        otp += Math.floor(Math.random()*10)
    }
    return otp
}

async function verifyOTP(req,userId,otp){
    const otpToken  = req.headers.authorization?.split(' ')[1] || null;
    if(!otpToken) 
        return {success:false,message:"OTP token not found",error:true};
    const decode = jwt.verify(otpToken,process.env.OTP_TOKEN_SECRET);
    if(!decode) 
        return {success:false,message:"Invalid OTP token",error:true};
    if(decode.userId !== userId)
        return {success:false,message:"Invalid UserId",error:true};
    if(decode.otp !== otp)
        return {success:false,message:"Invalid OTP",error:true};
    return {success:false,message:"OTP verified successfully",error:false};
}


async function sendOTP(res,userId,email){
    const otp = generateOTP();    
        const sent = sendMail({text:`Your otp is ${otp}`,html:`<h1>your otp is ${otp}</h1>`,to:email})
        if(!sent)
        return {message:"Error while sending otp",error:true}
        const otpToken = jwt.sign({userId,otp},process.env.OTP_TOKEN_SECRET,{expiresIn:"15m"});
        res.cookie("otpToken",otpToken,{maxAge:15 * 60 * 1000})
        return {message:"OTP sent successfully",error:false,otpToken}


}




module.exports = {
    
    verifyOTP,
    sendOTP
}