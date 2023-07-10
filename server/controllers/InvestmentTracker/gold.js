const {Gold} = require('../../models/InvestmentTracker');



const getGold = async (req,res,next)=>{
    try {
        const user = req.user;
        const gold = await Gold.findOne({userId:user._id});
        if(!gold){
            res.status(404);
            throw new Error("Gold tracker not found");
        }
        return res.status(200).json({success:true,data:gold});
    } catch (error) {
        next(error)
    }
}

const addGold = async (req,res,next)=>{
    try {
        const user = req.user;
        const {investedAmount,valueAtTheTimeOfInvestment} = req.body;
        if(!investedAmount || !valueAtTheTimeOfInvestment){
            res.status(400);
            throw new Error("Invalid request. investedAmount, valueAtTheTimeOfInvestment are required");
        }
        const gold = await Gold.findOne({userId:user._id});
        if(!gold){
            const newGold = await Gold.create({userId:user._id,investedAmount,valueAtTheTimeOfInvestment});
            return res.status(200).json({success:true,data:newGold});
        }
        gold.investedAmount = investedAmount;
        gold.valueAtTheTimeOfInvestment = valueAtTheTimeOfInvestment;
        await gold.save();
        return res.status(200).json({success:true,data:gold});
    } catch (error) {
        next(error)
    }
}

const deleteGold = async (req,res,next)=>{
    try {
        const user = req.user;
        const gold = await Gold.findOne({userId:user._id});
        if(!gold){
            res.status(404);
            throw new Error("Gold tracker not found");
        }
        await Gold.findOneAndRemove({userId:user._id});
        return res.status(200).json({success:true,data:{}});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getGold,
    addGold,
    deleteGold
}