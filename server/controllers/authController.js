const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendOTP,verifyOTP} = require("./utils/otp");
const { getAccessToken,getRefreshToken,setAccessToken,setRefreshToken } = require("./utils/token");


// verify otp sent to the email for register
async function verifyEmail(req,res){
    const { userId,otp } = req.body;
    if(!userId || !otp) return res.status(400).json({"success":false,error:"Invalid credentials"});
    try{
        const {success,message,error} = await verifyOTP(req,userId,otp);
        if(error){
            return res.status(400).json({success,message,error});
        }
        const user = await User.findOne({_id:userId});
        if(!user)
            return {success:false,message:"User doesn't exists",error:true};
        user.isEmailVerified = true;
        await user.save();
        return res.status(200).json({"success":true,message:"Successfull User Created and Verified, You can login now", userId:userId})
    }catch(error){
        return res.status(500).json({"success":false,error});
    }
}


// verify otp sent to the email for login
async function verifyUser(req,res){
    const { userId,otp } = req.body;
    if(!userId || !otp) return res.status(400).json({"success":false,error:"Invalid credentials"});
    try{
        const resp = await verifyOTP(req,userId,otp);
        if(!resp){
            return res.status(400).json({"success":false,error:"Invalid OTP"});
        }
        const user = await User.findByIdAndUpdate(userId,{isEmailVerified:true},{new:true}).select("-password");
        setAccessToken(res,{userId:user._id});
        const accessToken = getAccessToken({userId:user._id});
        if(!user.refreshToken){
            const refreshToken = getRefreshToken({userId:user._id});
            console.log(refreshToken);
            user.refreshToken = refreshToken;
            res.cookie("refreshToken",refreshToken,{httpOnly:true,maxAge:Number(process.env.REFRESH_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000,secure:true})
            await user.save();    
        }
        return res.status(200).json({"success":true,email:user.email,profilePicture:user.profilePicture,accessToken,name:user.name,isEmailVerified:user.isEmailVerified})
        
    }catch(err){
        return res.status(500).json({"success":false,error:err});
    }
}


// refresh the access token
async function refresh(req,res){
    const { refreshToken } = req.cookies.token;
    if(!refreshToken) return res.status(400).json({"success":false,error:"Invalid credentials"});
    try{
        const user = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        if(!user)
            return res.status(400).json({"success":false,error:"Invalid Token"});
        const accessToken = setAccessToken(res,{userId:user._id});
        return res.status(200).json({"success":true,message:"New access token has been generated",accessToken});
    } catch (error){
        return res.status(500).json({"success":false,error});
    }
}


// register a new user
async function register(req,res){
    const { email,password,phone } = req.body;
    if(!email || !password || !phone) return res.status(400).json({"success":false,error:"Invalid credentials"});
    try{
        const oldUsers = await User.find({$or:[{email},{phone}]})
        let [emailExists,phoneExists] = [false,false];
        if(oldUsers.length !==0){
            for(let user of oldUsers){
                if(user.email===email) emailExists = true;
                if(user.phone===phone) phoneExists = true;
            }
            return res.status(400).json({"success":false,emailExists,phoneExists})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({email,password:hashedPassword,phone});
        const {message,error} = await sendOTP(res,user._id,email);
        if(error){
            return res.status(500).json({"success":false,error:message})
        }
        return res.status(200).json({"success":true,userId:user._id,otpSent:true,message:message})
    }catch(err){
        console.log(err)
        return res.status(500).json({"success":false,error:err});
    }
}


// login a user
async function login(req,res){
    const { email, password} = req.body;
    if(!email || !password) return res.status(400).json({"success":false,error:"Invalid credentials"});
    try{

        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({"success":false,error:"User doesn't Exists"});
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect)
            return res.status(400).json({"success":false,error:"Invalid credentials"});
        const accessToken = setAccessToken(res,{userId:user._id});
        const refreshToken = setRefreshToken(res,{userId:user._id});
        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).json({"success":true,email:user.email,profilePicture:user.profilePicture,accessToken,name:user.name,isEmailVerified:user.isEmailVerified})
        
    }catch(error){
        return res.status(500).json({"success":false,error});
    }
}



async function resendOTP(req,res){
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).json({success:false,error:"Invalid credentials"});
    try {
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({success:false,message:"User not found",error:true})
        if(user.isEmailVerified)
            return res.status(400).json({success:false,message:"Email already verified, you can login using email and password",error:true})
        const isPasswordCorrect = bcrypt.compareSync(password,user.password)
        if(!isPasswordCorrect)
            return res.status(400).json({success:false,message:"Invalid Credentials",error:true});
        const {message,error,otpToken} = await sendOTP(res,user._id,email)
        if(error)
            return res.status(400).json({success:false,message})
        return res.status(200).json({message,error,otpToken,userId:user._id})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,error})
    }
}




module.exports = {
    register,
    login,
    verifyEmail,
    verifyUser,
    refresh,
    resendOTP
}