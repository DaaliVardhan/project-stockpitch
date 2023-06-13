const nodemailer = require("nodemailer");
require('dotenv').config()

async function mailConfig(){

    let config = {
        service : "gmail",
        auth : {
            user : process.env.EMAIL_ADDRESS,
            pass : process.env.EMAIL_TOKEN,
        }
    }
    let transporter = nodemailer.createTransport(config);
    return transporter
}

async function sendMail(mail){
    try{

        const transporter = await mailConfig();
        
        let info = await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS, 
            to: mail?.to || "", 
            subject: mail?.subject || "Hello",
            text: mail?.text || "Hello world?", 
            html: mail?.html || "<b>Hello world?</b>",
        });
        return true
    }
    catch(error){
        console.log(error)
        return false;
    }

    
}



module.exports = {sendMail};