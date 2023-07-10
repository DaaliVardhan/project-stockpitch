const {Saving} = require('../../models/InvestmentTracker');


const getSavings = async (req,res,next)=>{
    try {
        const user = req.user;
        const savings = await Saving.findOne({userId:user._id});
        if(!savings){
            res.status(404);
            throw new Error("Savings not found");
        }
        res.status(200).json({success:true,data:savings});
    } catch (error) {
        next(error)
    }
}

const addSavings = async (req,res,next)=>{
    try {
        const user = req.user;
        const { addSavings } = req.body;
        if(!addSavings){
            res.status(400);
            throw new Error("Invalid request. addSavings is required");
        }
        const savings = await Saving.findOne({userId:user._id});
        if(!savings){
            const newSavings = await Saving.create({userId:user._id,currentSavings:addSavings});
            return res.status(200).json({success:true,data:newSavings});
        }
        if(savings.currentSavings + addSavings < 0){
            res.status(400);
            throw new Error("Invalid request. Savings cannot be negative");
        }
        savings.currentSavings += addSavings;
        await savings.save();
        return res.status(200).json({success:true,data:savings});
    } catch (error) {
        next(error)
    }
}

const deleteSavings = async (req,res,next)=>{
    try {
        const user = req.user;
        const savings = await Saving.findOne({userId:user._id});
        if(!savings){
            res.status(404);
            throw new Error("Savings tracker not found");
        }
        await Saving.findOneAndRemove({userId:user._id});
        return res.status(200).json({success:true,data:{}});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getSavings,
    addSavings,
    deleteSavings
}