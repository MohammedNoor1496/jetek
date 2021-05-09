const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coupon = new Schema({
    sortDate: { type: Date },

}, { timestamps: true })
