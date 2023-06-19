const {   register, login, verifyEmail,  verifyUser, refresh, resendOTP,getAllUsers } = require('./authController');

const { forgotPassword, verifyForgotPassword, updatePassword } = require('./updateAuthController')

const { createOrUpdateUser, loginSuccessController, loginFailedController, logoutController } = require('./googleAuthController')



module.exports = {
    register,
    login,
    verifyEmail,
    verifyUser,
    refresh,
    getAllUsers,
    resendOTP,
    forgotPassword,
    verifyForgotPassword,
    updatePassword,
    createOrUpdateUser,
    loginSuccessController,
    loginFailedController,
    logoutController
}