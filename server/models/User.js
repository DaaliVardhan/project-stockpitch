const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"],
    },
    password:{
        type:String,
    },
    phone:{
        type:String,
        required:[true,"Phone is required"],
        unique:[true,"Phone already exists"],
    },
    name:{
        type:String,
        default:"",
    },
    profilePicture:{
        type:String,
        default:""
    },
    isEmailVerified:{
        type:Boolean,
        default:false 
    },
    refreshToken:{
        type:String,
        default:""
    }

},{collection:"users",timestamps:true});


module.exports = mongoose.model("User",userSchema);