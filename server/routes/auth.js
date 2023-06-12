const Router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { register,login,verifyUser,refresh,verifyEmail } = require("../controllers/authController")


// URL: /api/auth/register
// Method: POST
// Description: Register a new user
// Body: email,password,phone
Router.post("/register",asyncHandler(register))


// URL: /api/auth/login
// Method: POST
// Description: Login a user
// Body: email,password
Router.post("/login",asyncHandler(login))


// URL: /api/auth/verify
// Method: POST
// Description: Verify the OTP sent to the user after Login
// Body: userId,otp
Router.post("/verifyOTP",asyncHandler(verifyUser))

// URL: /api/auth/refresh
// Method: POST
// Description: Refresh the access token
// Body: refreshToken
Router.post("/refresh",asyncHandler(refresh))


// URL: /api/auth/verifyEmail
// Method: POST
// Description: Verify the OTP sent to the user after Register
// Body: userId,otp
Router.post("/verifyEmail",asyncHandler(verifyEmail))    



module.exports = Router;