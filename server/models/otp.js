const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now(),
    }

}, { collection: "otp" });

otpSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 300 });
module.exports = mongoose.model("Otp", otpSchema);