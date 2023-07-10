const mongoose = require('mongoose');

const GoldSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User Id is required"],
    },
    investedAmount:{
        type:Number,
        required:[true,"Invested Amount is required"],
    },
    valueAtTheTimeOfInvestment:{
        type:Number,
        required:[true,"Value at the time of Investment is required"],
    }
},{collection:'gold',timestamps:true})



module.exports = mongoose.model('Gold',GoldSchema);