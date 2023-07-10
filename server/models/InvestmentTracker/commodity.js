const mongoose = require('mongoose');

const commoditySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User Id is required"],
    },
    commodityName:{
        type:String,
        unique:[true,"Commodity Name should be unique"],
        required:[true,"Commodity Name is required"],
    },
    investedAmount:{
        type:Number,
        required:[true,"Invested Amount is required"],
    },
    currentValue:{
        type:Number,
        required:[true,"Current Value is required"],
    }
},{collection:'commodity',timestamps:true})

module.exports = mongoose.model('Commodity',commoditySchema);