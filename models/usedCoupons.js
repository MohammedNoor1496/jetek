const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsedCoupon = new Schema({
    useId:{
        type: String,
        required: true,
    },
    couponId:{
        type: String,
        require:true,
    },
}, { timestamps: true })
module.exports = mongoose.model('UsedCoupon', UsedCoupon);
