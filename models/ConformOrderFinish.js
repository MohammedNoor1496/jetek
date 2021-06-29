const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conformOrderFinish = new Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Order'

    },
    sentOtp: {
        type: Number,
        required: false,
    },


}, { timestamps: true })


module.exports = mongoose.model('ConformOrderFinish', conformOrderFinish);
