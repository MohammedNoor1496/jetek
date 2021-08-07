const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coupon = new Schema({
    coponeText:{
        type: String,
        required: true,
    },
    disPrecintege:{
        type: String,
        default:0.05,
    },
}, { timestamps: true })
module.exports = mongoose.model('Coupon', coupon);
