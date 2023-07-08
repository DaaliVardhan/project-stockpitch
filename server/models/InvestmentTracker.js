const mongoose = require('mongoose');


const investmentTrackerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User Id is required"],
    },
    investmentName:{
        type:String,
        required:[true,"Investment Name is required"],  
    },
    investmentType:{
        type:String,
        required:[true,"Investment Type is required"],
        enum : ["Savings","Stocks","Mutual Funds","Bonds","Gold","Public Provident Fund","Fixed Deposit","Real Estate","Commodities","Others"],
        default:"Others",
    },
    investmentAmount:{
        type:Number,
        required:[true,"Investment Amount is required"],
    },
    valueAtTheTimeOfInvestment:{
        type:Number,
        // required:[true,"Value at the time of Investment is required"],
    },
    investmentDate:{
        type:Date,
        required:[true,"Investment Date is required"],
        default:Date.now(),
    },

},{collection:'investmentTracker',timestamps:true});


module.exports = mongoose.Model("Tracker",investmentTrackerSchema)