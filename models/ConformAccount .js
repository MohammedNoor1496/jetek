const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conformAccount = new Schema({
    phone: {
        type: Number,
        required: true,
    },
    sentOtp: {
        type: Number,
        required: false,
    },
    sortDate: { type: Date },

}, { timestamps: true })


module.exports = mongoose.model('ConformAccount', conformAccount);
