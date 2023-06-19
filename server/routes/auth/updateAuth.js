const Router = require("express").Router();
const asyncHandler = require('express-async-handler')
const { forgotPassword,verifyForgotPassword,updatePassword, } = require("../../controllers/authController")

// URL : /api/auth/forgot
// Method : POST
// Desc : Send OTP to the user's email
Router.post('/',asyncHandler(forgotPassword));


// URL : /api/auth/forgot/verify
// Method : POST
// Desc : Verify the OTP sent to the user's email
Router.post('/verify',asyncHandler(verifyForgotPassword));


// URL : /api/auth/forgot/update
// Method : POST
// Desc : Update the user's password
Router.post('/update',asyncHandler(updatePassword));


module.exports = Router;