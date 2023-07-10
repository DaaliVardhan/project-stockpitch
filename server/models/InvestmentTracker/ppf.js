const mongoose = require('mongoose');

const PPFSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User Id is required"],
    },
    investedAmount:{
        type:Number,
        required:[true,"Invested Amount is required"],
    }
},{collection:'ppf',timestamps:true})


module.exports = mongoose.model('PPF',PPFSchema);