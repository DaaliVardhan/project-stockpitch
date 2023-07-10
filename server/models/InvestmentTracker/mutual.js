const mongoose = require('mongoose');

const MutualFundSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User Id is required"],
    },
    mutualFundName:{
        type:String,
        required:[true,"Mutual Fund Name is required"],
    },
    investedAmount:{
        type:Number,
        required:[true,"Invested Amount is required"],
    },
    currentValue:{
        type:Number,
        required:[true,"Current Value is required"],
    }
},{collection:'mutualFund',timestamps:true})


module.exports = mongoose.model('MutualFund',MutualFundSchema);