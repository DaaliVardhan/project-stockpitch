const router = require('express').Router();
const User = require('../models/User');



async function getUserName(req,res,next){
    const userId = req.query?.userId ||"6488809ebbeaba9e7c7c1a58";
    try {
        const user = await User.findOne({_id:userId}).select('-password');
        req.user = user;
        next();
    } catch (error) {
        next(error)
    }
}



async function isVerifed(req,res,next){
    try {
        const user = req.user;
    if(!user.isEmailVerified){
        res.status(403);
        throw new Error("Email is not verified");
    }
    next();
    } catch (error) {
        next(error)
    }
}

router.use(getUserName);
router.use(isVerifed);

router.get('/',(req,res,next)=>{
    res.status(501);
    throw new Error("Not Implemented");
})

module.exports = router;