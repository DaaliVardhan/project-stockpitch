const {MutualFund} = require('../../models/InvestmentTracker');

const getMutualFunds = async (req,res,next)=>{
    try {
        const user = req.user;
        const mutualFunds = await MutualFund.find({userId:user._id});
        if(!mutualFunds || mutualFunds.length == 0){
            res.status(404);
            throw new Error("Mutual Funds tracker not found");
        }
        return res.status(200).json({success:true,data:mutualFunds});
    } catch (error) {
        next(error)
    }
}


const addMutualFunds = async (req,res,next)=>{
    try {
        const user = req.user;
        const {mutualFundName,investedAmount,currentValue} = req.body;
        if(!mutualFundName || !investedAmount || !currentValue){
            res.status(400);
            throw new Error("Invalid request. mutualFundName, investedAmount, currentValue are required");
        }
        const mutualFund = await MutualFund.findOne({userId:user._id,mutualFundName});
        if(!mutualFund){
            const newMutualFund = await MutualFund.create({userId:user._id,mutualFundName,investedAmount,currentValue});
            return res.status(200).json({success:true,data:newMutualFund});
        }
        mutualFund.investedAmount = investedAmount;
        mutualFund.currentValue = currentValue;
        await mutualFund.save();
        return res.status(200).json({success:true,data:mutualFund});
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getMutualFunds,
    addMutualFunds,
}