const {CustomTracker} = require('../../models/InvestmentTracker');


const getCustomTracker = async (req,res,next)=>{
    try {
        const user = req.user;
        const customTracker = await CustomTracker.find({userId:user._id});
        if(!customTracker || customTracker.length == 0){
            res.status(404);
            throw new Error("Custom tracker not found");
        }
        return res.status(200).json({success:true,data:customTracker});
    } catch (error) {
        next(error)
    }
}


const addCustomTracker = async (req,res,next)=>{
    try {
        const user = req.user;
        const {trackerName,investedAmount,valueAtTheTimeOfInvestment,currentValue} = req.body;
        if(!trackerName || !investedAmount || !valueAtTheTimeOfInvestment || !currentValue){
            res.status(400);
            throw new Error("Invalid request. trackerName, investedAmount, valueAtTheTimeOfInvestment, currentValue are required");
        }
        const customTracker = await CustomTracker.findOne({userId:user._id,trackerName});
        if(!customTracker){
            const newCustomTracker = await CustomTracker.create({userId:user._id,trackerName,investedAmount,valueAtTheTimeOfInvestment,currentValue});
            return res.status(200).json({success:true,data:newCustomTracker});
        }
        customTracker.investedAmount = investedAmount;
        customTracker.valueAtTheTimeOfInvestment = valueAtTheTimeOfInvestment;
        customTracker.currentValue = currentValue;
        await customTracker.save();
        return res.status(200).json({success:true,data:customTracker});
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getCustomTracker,
    addCustomTracker,
}