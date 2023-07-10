const mongoose = require('mongoose');

const SavingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User Id is required"],
    },
    currentSavings:{
        type:Number,
        required:[true,"Current Savings is required"],
        default:0,
    },
},{collection:'savings',timestamps:true})


module.exports = mongoose.model('Saving',SavingSchema);




