const {Bond} = require('../../models/InvestmentTracker');



const getBondTypes = async (req,res,next)=>{
    try {
        const bondType = ["Government","Corporate"];
        return res.status(200).json({success:true,data:bondType});
    } catch (error) {
        next(error)
    }
}



const getBonds = async (req,res,next)=>{
    try {
        const user = req.user;
        const bonds = await Bond.find({userId:user._id});
        if(!bonds){
            res.status(404);
            throw new Error("Bonds tracker not found");
        }
        return res.status(200).json({success:true,data:bonds});
    } catch (error) {
        next(error)
    }
}


const addBonds = async (req,res,next)=>{
    try {
        const user = req.user;
        const {bondName,amountInvested,bondType} = req.body;
        if(!bondName || !amountInvested || !bondType){
            res.status(400);
            throw new Error("Invalid request. bondName, amountInvested, bondType are required");
        }
        const bond = await Bond.findOne({userId:user._id,bondName});
        if(!bond){
            const newBond = await Bond.create({userId:user._id,bondName,amountInvested,bondType});
            return res.status(200).json({success:true,data:newBond});
        }
        bond.amountInvested = amountInvested;
        bond.bondType = bondType;
        await bond.save();
        return res.status(200).json({success:true,data:bond});
        
    } catch (error) {
        next(error)
    }
}


const deleteBonds = async (req,res,next)=>{
    try {
        const user = req.user;
        const {bondName,bondId} = req.body;
        if(!bondName && !bondId){
            res.status(400);
            throw new Error("Invalid request. bondName or bondId is required");
        }
        if(bondName){
            const bond = Bond.findOne({userId:user._id,bondName});
            if(!bond){
                res.status(404);
                throw new Error("Bond not found");
            }
            await Bond.findOneAndRemove({userId:user._id,bondName});
            return res.status(200).json({success:true,data:{}})
        }
        if(bondId){
            const bond = Bond.findOne({userId:user._id,_id:bondId});
            if(!bond){
                res.status(404);
                throw new Error("Bond not found");
            }

            await Bond.findOneAndRemove({userId:user._id,_id:bondId});
            return res.status(200).json({success:true,data:{}})
        }
    } catch (error) {
        next(error)
    }
}




module.exports = {
    getBondTypes,
    getBonds,
    addBonds,
    deleteBonds
}