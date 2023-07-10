const {PPF} = require('../../models/InvestmentTracker');

const getPpf = async (req,res,next)=>{
    try {
        const user = req.user;
        const ppf = await PPF.findOne({userId:user._id});
        if(!ppf){
            res.status(404);
            throw new Error("PPF tracker not found");
        }
        return res.status(200).json({success:true,data:ppf});
    } catch (error) {
        next(error)
    }
}


const addPpf = async (req,res,next)=>{
    try {
        const user = req.user;
        const {investedAmount} = req.body;
        if(!investedAmount){
            res.status(400);
            throw new Error("Invalid request. investedAmount is required");
        }
        const ppf = await PPF.findOne({userId:user._id});
        if(!ppf){
            const newPPF = await PPF.create({userId:user._id,investedAmount});
            return res.status(200).json({success:true,data:newPPF});
        }
        ppf.investedAmount = investedAmount;
        await ppf.save();
        return res.status(200).json({success:true,data:ppf});
    } catch (error) {
        next(error)
    }
}


const deletePpf = async (req,res,next)=>{
    try {
        const user = req.user;
        const ppf = await PPF.findOne({userId:user._id});
        if(!ppf){
            res.status(404);
            throw new Error("PPF tracker not found");
        }
        await PPF.findOneAndRemove({userId:user._id});
        return res.status(200).json({success:true,data:{}});
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getPpf,
    addPpf,
    deletePpf
}