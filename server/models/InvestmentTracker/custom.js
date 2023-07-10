const mongoose = require('mongoose');

const CustomTrackerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User Id is required"],
    },
    trackerName:{
        type:String,
        required:[true,"Tracker Name is required"],
    },
    investedAmount:{
        type:Number,
        required:[true,"Invested Amount is required"],
    },
    valueAtTheTimeOfInvestment:{
        type:Number,
        required:[true,"Value at the time of Investment is required"],
    },
    currentValue:{
        type:Number,
        required:[true,"Current Value is required"],
    }
},{collection:'customTracker',timestamps:true})

module.exports = mongoose.model('CustomTracker',CustomTrackerSchema);
