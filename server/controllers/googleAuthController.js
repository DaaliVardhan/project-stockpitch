const User = require("../models/User");
require("dotenv").config();
const { getRefreshToken,setAccessToken } = require("./utils/token");


async function createOrUpdateUser(profile){
    const {email,email_verified,name,picture,sub} = profile._json;
    try{
        const user = await User.findOneAndUpdate({email:email},{
            email:email,
            name:name,
            profilePicture:picture,
            googleId:sub,
            isEmailVerified:email_verified
        },{new:true,upsert:true}
        ).select(["-password","-googleId","-facebookId"]);
        const refreshToken = getRefreshToken({userId:user._id})
        user.refreshToken = refreshToken
        await user.save();
        return {userId:user._id,name:user.name,email:user.email,profilePicture:user.profilePicture,isEmailVerified:user.isEmailVerified};
    }
    catch(err){
        console.log(err);
        return err;
    }
    
}

async function loginSuccessController(req,res){
    if(req.user){
        const accessToken = setAccessToken(res,{userId:req.user._id});
        res.cookie("refreshToken",req.user.refreshToken,{httpOnly:true,maxAge:Number(process.env.REFRESH_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000,secure:true})
        return res.status(200).json({
            success:true,
            message:"Login successful",
            user:req.user,
            accessToken
        })
    }

    return res.status(401).json({
        success:false,
        message:"Login failed"
    })
}

async function loginFailedController(req,res){
    return res.status(400).json({
        success:false,
        message:"Login failed"
    })
}


async function logoutController(req,res){
    req.logout();
    return res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
}
module.exports = {
    createOrUpdateUser,
    loginSuccessController,
    loginFailedController,
    logoutController
}