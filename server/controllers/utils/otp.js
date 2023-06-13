
const Otp = require("../../models/otp");
const { sendMail } = require('./mailer');

function generateOTP(){
    let otp = ""
    for(let i=0;i<4;i++){
        otp += Math.floor(Math.random()*10)
    }
    return otp
}

async function verifyOTP(userId,otp){
    if(!userId || !otp) {
        console.log("Invalid credentials");
        return false;
    };
    try{
        let otpDoc = await Otp.findOne({userId:userId});
        if(!otpDoc){
            return false;
        }
        if(otpDoc.otp === otp){
            await Otp.findOneAndDelete({_id:otpDoc._id})
            return true;
        }
        return false;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

async function sendOTP(userId,email){
    const otp = generateOTP();    
    try{
        const otpDoc = await Otp.findOneAndUpdate({userId},{userId,otp},{
            new:true,
            upsert:true
        })
        console.log(otpDoc)

        if(!otpDoc)
            return ["OTP Expired",true]
        const sent = sendMail({text:`Your otp is ${otp}`,html:`<h1>your otp is ${otp}</h1>`,to:email})
        if(sent)
            return {message:"OTP sent to your mail",error:false}
        else
            return {message:"Error while sending otp",error:true}
    }
    catch (err){
        console.log("Error while saving otp");
        return {message:err,error:true}
    }

}




module.exports = {
    
    verifyOTP,
    sendOTP
}