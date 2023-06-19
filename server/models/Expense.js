const mongoose = require('mongoose');
const { validate } = require('uuid');

const Expense = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User Id is required"],
        ref:"User",
        validate:{
            validator:function(value){
                return mongoose.Types.ObjectId.isValid(value);
            }
        }
    },
    date:{
        type:Date,
        required:[true,"Date is required"],
        default:()=>Date.now()
    },
    income:{
        type:Number,
        default:0,
        validate:{
            validator:function(value){
                return value>=0;
            }
        }
    },
    shoppingExpense:{
        type:Number,
        default:0
    },
    payments:{
        type:Number,
        default:0,
    },
    foodExpense:{
        type:Number,
        default:0
    },
    others:{
        type:Number,
        default:0
    }
},{timestamps:true,collection:"expenses"});

// method to find the total expense of a user
Expense.statics.getExpense = async function({userId,startDate,endDate}){
    if(startDate && endDate){
        
        return this.aggregate([
            {
                $match:{
                    userId:userId,
                    date:{
                        $gte:new Date(startDate),
                        $lte:new Date(endDate)
                    }
                }
            },
            {
                $group:{
                    _id:null,
                    income:{$sum:"$income"},
                    shoppingExpense:{$sum:"$shoppingExpense"},
                    payments:{$sum:"$payments"},
                    foodExpense:{$sum:"$foodExpense"},
                    others:{$sum:"$others"},
                    totalExpense:{$sum:{$add:["$shoppingExpense","$payments","$foodExpense","$others"]}}
                }
            }
        ])
    }
    if(startDate){
        return this.aggregate([
            {
                $match:{
                    userId:userId,
                    date:{
                        $gte:new Date(startDate)
                    }
                }
            },{
                $group:{
                    _id:null,
                    income:{$sum:"$income"},
                    shoppingExpense:{$sum:"$shoppingExpense"},
                    payments:{$sum:"$payments"},
                    foodExpense:{$sum:"$foodExpense"},
                    others:{$sum:"$others"},
                    totalExpense:{$sum:{$add:["$shoppingExpense","$payments","$foodExpense","$others"]}}
                }
            }
        ])
    }

    if(endDate){
        return this.aggregate([
            {
                $match:{
                    userId:userId,
                    date:{
                        $lte:new Date(endDate)
                    }
                }
            },{
                $group:{
                    _id:null,
                    income:{$sum:"$income"},
                    shoppingExpense:{$sum:"$shoppingExpense"},
                    payments:{$sum:"$payments"},
                    foodExpense:{$sum:"$foodExpense"},
                    others:{$sum:"$others"},
                    totalExpense:{$sum:{$add:["$shoppingExpense","$payments","$foodExpense","$others"]}}
                }
            }
        ])
    }
    return this.aggregate([
        {
            $match:{
                userId:userId,
            }
        },
        {
            $group:{
                _id:null,
                income:{$sum:"$income"},
                shoppingExpense:{$sum:"$shoppingExpense"},
                payments:{$sum:"$payments"},
                foodExpense:{$sum:"$foodExpense"},
                others:{$sum:"$others"},
                totalExpense:{$sum:{$add:["$shoppingExpense","$payments","$foodExpense","$others"]}}
            }
        }
    ])
}


module.exports = mongoose.model("Expense",Expense);