
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const Router = require("express").Router();
const passport = require('passport');
const { createOrUpdateUser } = require('../../../controllers/authController/facebookAuthController');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL:`${process.env.SERVER_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true
},async (accessToken,refreshToken,profile,done)=>{
    try{
        const user = await createOrUpdateUser(profile);
        if(!user) return done(null,false);
        done(null,user);
    } catch (error){
        console.log(error);
        done(error,null);
    }
}))


// URL : /auth/facebook
// Method : GET
// Desc : Redirects to facebook login page
Router.get("/",passport.authenticate('facebook',{ scope: ['user_friends', 'manage_pages'] }));


// URL : /auth/facebook/callback
// Method : GET
// Desc : Callback URL for facebook login
Router.get('/callback',passport.authenticate('facebook',{
    failureRedirect: '/auth/facebook/failed',
    successRedirect:"/auth/facebook/success",
}))

// URL : /auth/facebook/logout
// Method : GET
// Desc : Logout URL for facebook login
Router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect("/");
})

// URL : /auth/facebook/success
// Method : GET
// Desc : Success URL for facebook login
Router.get('/success',(req,res)=>{
    if(req.user){
        return res.status(200).json({
            success:true,
            message:"Login successful",
            user:req.user
        })
    }
    return res.status(401).json({
        success:false,
        message:"Login failed"
    })
})

Router.get('/failed',(req,res)=>{
    return res.status(400).json({
        success:false,
        message:"Login failed"
    })
})

module.exports = Router;