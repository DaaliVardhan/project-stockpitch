const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"],
        lowercase:true,
    },
    password:{
        type:String,
    },
    phone:{
        type:String,
        required:[true,"Phone is required"],
        unique:[true,"Phone already exists"],
        default:uuidv4().substring(0,9),
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
    },
    googleId:{
        type:String,
        default:""
    },
    facebookId:{
        type:String,
        default:""
    }

},{collection:"users",timestamps:true});


module.exports = mongoose.model("User",userSchema);