
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const Router = require("express").Router();
require('dotenv').config();
const { createOrUpdateUser,loginSuccessController,loginFailedController,logoutController } = require('../../controllers/googleAuthController');





passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: ['profile','email'],
    callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    passReqToCallback   : true
},async (req,accessToken,refreshToken,profile,done)=>{
    try{
        const user = await createOrUpdateUser(profile);
        if(!user) return done(null,false);
        done(null,user);
    } catch (error){
        console.log(error);
        done(error,null);
    }
}))

// URL : /auth/google
// Method : GET
// Desc : Redirects to google login page
Router.get("/",passport.authenticate('google',
    {
        scope:[
            'profile',
            'email',
        ]
    }));

// URL : /auth/google/callback
// Method : GET
// Desc : Callback URL for google login
Router.get('/callback',
    passport.authenticate('google', 
        { 
            failureRedirect: '/auth/google/failed',
            successRedirect:"/auth/google/success",
        }),
    )

// URL : /auth/google/logout
// Method : GET
// Desc : Logout URL for google login
Router.get('/logout',loginFailedController)

// URL : /auth/google/success
// Method : GET
// Desc : Success URL for google login
Router.get('/success',loginSuccessController)


// URL : /auth/google/failed
// Method : GET
// Desc : Failed URL for google login
Router.get('/failed',loginFailedController)




module.exports = Router;