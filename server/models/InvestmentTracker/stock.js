const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User Id is required"],
    },
    stockName:{
        type:String,
        unique:[true,"Stock Name already exists"],
        required:[true,"Stock Name is required"],
    },
    buyAveragePrice:{
        type:Number,
        required:[true,"Buy Average Price is required"],
    },
    investedValue:{
        type:Number,
        required:[true,"Invested Value is required"],
    }
},{collection:'stocks',timestamps:true})

module.exports = mongoose.model('Stock',StockSchema);