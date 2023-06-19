
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendOTP,verifyOTP } = require("../utils/otp");
const {  setForgotPasswordToken } = require("../utils/token");
require('dotenv').config();


async function forgotPassword(req,res){
    const {email} = req.body;
    if(!email) return res.status(400).json({"success":false,error:"Invalid credentials"});
    try {
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({"success":false,error:"User doesn't Exists"});
        const {message,error} = await sendOTP(res,user._id,email);
        if(error)
            return res.status(500).json({"success":false,error:message});
        return res.status(201).json({"success":true,userId:user._id,otpSent:true,message:"OTP sent to your email"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({"success":false,error});
    }
}

async function verifyForgotPassword(req,res){
    const { userId,otp } = req.body;
    if(!userId || !otp) return res.status(400).json({"success":false,error:"Invalid credentials"});
    
        const resp = await verifyOTP(req,userId,otp);
        if(!resp){
            return res.status(400).json({"success":false,error:"Invalid OTP"});
        }
        const token = setForgotPasswordToken(res,{userId});
        return res.status(200).json({"success":true,message:"OTP verified, You can update your password", userId:userId,token})
    // }catch(error){
    //     return res.status(500).json({"success":false,error});
    // }
}

async function updatePassword(req,res){
    const { userId, password } = req.body;
    const token = req?.cookies?.updateToken || req.headers.authorization.split(' ')[1];

    if(!userId || !password || !token) return res.status(400).json({"success":false,error:"Invalid credentials"});
    try {
        const tokenUserId = jwt.verify(token,process.env.FORGOT_PASSWORD_TOKEN_SECRET);
        console.log(tokenUserId)
        if(!userId)
            return res.status(400).json({"success":false,error:"Invalid Token"});
        if(!tokenUserId===userId)
            return res.status(400).json({"success":false,error:"Invalid Token"});
        const user = await User.findOne({_id:userId});
        if(!user)
        return res.status(400).json({"success":false,error:"User doesn't Exists"});
        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword;
        await user.save();
        res.clearCookie("updateToken");
        return res.status(200).json({"success":true,message:"Password updated successfully"});
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    forgotPassword,
    verifyForgotPassword,
    updatePassword
}