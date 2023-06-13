require('dotenv').config();
const jwt = require('jsonwebtoken');


function getAccessToken(obj){
    return jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

function getRefreshToken(obj){
    return jwt.sign(obj,process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}

function setRefreshToken(res,obj){
    const refreshToken = getRefreshToken(obj);
    res.cookie("refreshToken",refreshToken,{httpOnly:true,maxAge:Number(process.env.REFRESH_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000,secure:true})
    return refreshToken
}

function setAccessToken(res,obj){
    const accessToken = getAccessToken(obj);
    res.cookie("accessToken",accessToken,{httpOnly:false,maxAge:Number(process.env.ACCESS_COOKIE_EXPIRY) * 60 * 1000})
    return accessToken
}


function getForgotPasswordToken(obj){
    const forgotPasswordToken = jwt.sign(obj,process.env.FORGOT_PASSWORD_TOKEN_SECRET,{expiresIn:process.env.FORGOT_PASSWORD_TOKEN_EXPIRY})
    return forgotPasswordToken;
}

function setForgotPasswordToken(res,obj){
    const forgotPasswordToken = getAccessToken(obj);
    res.cookie("updateToken",forgotPasswordToken,{httpOnly:true,maxAge:Number(process.env.FORGOT_PASSWORD_COOKIE_EXPIRY) * 60 * 1000})
    return forgotPasswordToken;
}

module.exports = {
    getAccessToken,
    getRefreshToken,
    setRefreshToken,
    setAccessToken,
    getForgotPasswordToken,
    setForgotPasswordToken
}