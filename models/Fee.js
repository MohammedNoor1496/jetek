const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feeSchema = new Schema({
    feePerTime: {
        type: Number,
        required: true,
        default:1
    },
    FeePerDistance: {
        type: Number,
        required: false,
        default:1
    },
}, { timestamps: true })


module.exports = mongoose.model('Fee', feeSchema);
