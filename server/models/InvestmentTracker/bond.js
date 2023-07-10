const mongoose = require('mongoose');

const BondSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User Id is required"],
    },
    bondName:{
        type:String,
        required:[true,"Bond Name is required"],
    },
    amountInvested:{
        type:Number,
        required:[true,"Amount Invested is required"],
    },
    bondType:{
        type:String,
        required:[true,"Bond Type is required"],
        enum : ["Government","Corporate"],
        default:"Government",
    },
},{collection:'bonds',timestamps:true})


module.exports = mongoose.model('Bond',BondSchema);