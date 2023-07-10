const {Commodity} = require('../../models/InvestmentTracker');

const getCommodity = async (req,res,next)=>{
    try {
        const user = req.user;
        const commodity = await Commodity.find({userId:user._id});
        if(!commodity || commodity.length == 0){
            res.status(404);
            throw new Error("Commodity tracker not found");
        }
        return res.status(200).json({success:true,data:commodity});
    } catch (error) {
        next(error)
    }
}


const addCommodity = async (req,res,next)=>{
    try {
        const user = req.user;
        const {commodityName,investedAmount,currentValue} = req.body;
        if(!commodityName || !investedAmount || !currentValue){
            res.status(400);
            throw new Error("Invalid request. commodityName, investedAmount, currentValue are required");
        }
        const commodity = await Commodity.findOne({userId:user._id,commodityName});
        if(!commodity){
            const newCommodity = await Commodity.create({userId:user._id,commodityName,investedAmount,currentValue});
            return res.status(200).json({success:true,data:newCommodity});
        }
        commodity.investedAmount = investedAmount;
        commodity.currentValue = currentValue;
        await commodity.save();
        return res.status(200).json({success:true,data:commodity});
    } catch (error) {
        next(error)
    }
}


const deleteCommodity = async (req,res,next)=>{
    try {
        const user = req.user;
        const {commodityName,commodityId} = req.body;
        if(!commodityName && !commodityId){
            res.status(400);
            throw new Error("Invalid request. commodityName or commodityId is required");
        }
        if(commodityName){
            const commodity = await Commodity.findOne({userId:user._id,commodityName});
            if(!commodity){
                res.status(404);
                throw new Error("Commodity tracker not found");
            }
            await Commodity.findOneAndRemove({userId:user._id,commodityName});
            return res.status(200).json({success:true,data:{}});
        }
        if(commodityId){
            const commodity = await Commodity.findOne({userId:user._id,_id:commodityId});
            if(!commodity){
                res.status(404);
                throw new Error("Commodity tracker not found");
            }
            await Commodity.findOneAndRemove({userId:user._id,_id:commodityId});
            return res.status(200).json({success:true,data:{}});
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getCommodity,
    addCommodity,
    deleteCommodity
}