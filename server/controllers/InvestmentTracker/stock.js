const {Stock} = require('../../models/InvestmentTracker');



const getStocks = async (req,res,next)=>{
    try {
        const user = req.user;
        const stocks = await Stock.find({userId:user._id});
        if(!stocks){
            res.status(404);
            throw new Error("Stock tracker not found");
        }
        return res.status(200).json({success:true,data:stocks});
    } catch (error) {
        next(error)
    }
}

const addStocks = async (req,res,next)=>{
    try {
        const user = req.user;
        const {stockName,buyAveragePrice,investedValue} = req.body;
        if(!stockName || !buyAveragePrice || !investedValue){
            res.status(400);
            throw new Error("Invalid request. stockName, buyAveragePrice, investedValue are required");
        }
        // const stock = await Stock.find({userId:user._id});
        // if(!stock || stock.length == 0){
        //     const newStock = await Stock.create({userId:user._id,stockName,buyAveragePrice,investedValue});
        //     return res.status(200).json({success:true,data:newStock});
        // }
        const oneStock =await Stock.findOne({user_id:user._id,stockName});
        if(!oneStock){
            const newStock = await Stock.create({userId:user._id,stockName,buyAveragePrice,investedValue});
            return res.status(200).json({success:true,data:newStock});
        }
        oneStock.buyAveragePrice = buyAveragePrice;
        oneStock.investedValue = investedValue;
        await oneStock.save();
        return res.status(200).json({success:true,data:oneStock});
    } catch (error) {
        next(error)
    }
}

const deleteStocks = async (req,res,next) =>{
    try {
        const user = req.user;
        const {stockName,stockId} = req.body;
        if(!stockName && !stockId){
            res.status(400);
            throw new Error("Invalid request. stockName or stockId is required");
        }
        if(stockName){
            const stock = await Stock.findOne({userId:user._id,stockName})
            if(!stock){
                res.status(404);
                throw new Error("Stock not found");
            }
            await Stock.findOneAndRemove({userId:user._id,stockName})
            return res.status(200).json({success:true,data:{}})
        }
        if(stockId){
            const stock = await Stock.findOne({_id:stockId,userId:user._id})
            if(!stock){
                res.status(404);
                throw new Error("Stock not found");
            }
            await Stock.findOneAndRemove({_id:stockId,userId:user._id,})
            return res.status(200).json({success:true,data:{}})
        }
    } catch (error) {
        next(error)
    }
}

module.exports={
    getStocks,
    addStocks,
    deleteStocks
}