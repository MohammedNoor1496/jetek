const mongoose = require('mongoose');
const { Schema } = mongoose;

const order = new Schema({
    user_Phone: {
        type: Number,
        require: true
    },
    captin_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Captin'
    },
    sell_point_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'SellPoint'
    },
    products_id: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Prouduct'
        }
    ],
    destination_long: {
        type: Number,
        required: true,
    },
    destination_lat: {
        type: Number,
        required: true,
    },
    origin_long: {
        type: Number,
        required: true,
    },
    origin_lat: {
        type: Number,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
    payment: {
        type: Number,
        require
    },
    paid: {
        type: Boolean
    }
    ,distance:{
        type: String,
        require: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Order', order);