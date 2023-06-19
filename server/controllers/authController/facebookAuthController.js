const User = require('../../models/User');

async function createOrUpdateUser(profile){
    const { id , displayName, email, photos} = profile._json();
    try{
        const user = await User.findOneAndUpdate({email},{
            facebookId:id,
            name:displayName,
            proficePicture:photos,
            isEmailVerified:true,
        },{new:true,upsert:true}).select(["-password","-googleId","-facebookId"])
        const refreshToken = getRefreshToken({userId:user._id})
        user.refreshToken = refreshToken
        await user.save();
        return {userId:user._id,name:user.name,email:user.email,profilePicture:user.profilePicture,isEmailVerified:user.isEmailVerified};
    

    }catch(error){
        console.log(error);
        return error
    }

}

module.exports = {
    createOrUpdateUser
}