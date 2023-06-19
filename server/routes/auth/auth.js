const Router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { register,login,refresh,verifyEmail,resendOTP } = require("../../controllers/authController/authController")
const updateAuthRouter = require("./updateAuth")

// URL: /api/auth/register
// Method: POST
// Description: Register a new user
// Body: email,password,phone
// Response: success,userId,otpSent,message
Router.post("/register",asyncHandler(register))

// URL: /api/auth/verifyEmailOTP
// Method: POST
// Description: Verify the OTP sent to the user after Register
// Body: userId,otp
// Response: success,message
Router.post("/verifyEmailOTP",asyncHandler(verifyEmail))    

// URL : /api/auth/resendOTP
// Method : POST
// Description : Request OTP if registered but not verified
Router.post('/resendOTP',asyncHandler(resendOTP))

// URL: /api/auth/refresh
// Method: POST
// Description: Refresh the access token
// Body: refreshToken
// Response: success,message,accessToken
Router.post("/refresh",asyncHandler(refresh))


// URL: /api/auth/login
// Method: POST
// Description: Login a user
// Body: email,password
// Response: success,email,profilePicture,accessToken,name,isEmailVerified
Router.post("/login",asyncHandler(login))

/*

// OTP based login

* URL: /api/auth/verify
* Method: POST
* Description: Verify the OTP sent to the user after Login
* Body: userId,otp
* Router.post("/verifyOTP",asyncHandler(verifyUser))

*/

// URL : /api/auth/logout
// Method : POST
// Desc : Logout the user
// Response : success,message
Router.post('/logout',asyncHandler((req,res)=>{
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.clearCookie('session-cookie');
    return res.status(200).json({"success":true,message:"Logged out successfully"});
}))

Router.use("/forgot",updateAuthRouter)


module.exports = Router;