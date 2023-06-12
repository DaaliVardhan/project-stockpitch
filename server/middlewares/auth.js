const User = require('../models/User')


async function verifyToken(req,res,next){
    const { accessToken , refreshToken } = req.cookies;
    if(!accessToken && !refreshToken) return res.status(401).json({"success":false,error:"Unauthorized"});
    try{
        const accessTokenUserId = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        const refreshTokenUserId = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        if(accessTokenUserId.userId !== refreshTokenUserId.userId) return res.status(401).json({"success":false,error:"Unauthorized"});
        const user = await User.findOne({_id:accessTokenUserId.userId});
        if(!user)
            return res.status(401).json({"success":false,error:"Unauthorized"});
        req.user = user;
        next();
        
    }catch(error){
        console.log(error);
        return res.status(500).json({"success":false,error});
    }
}

module.exports = {
    verifyToken
}