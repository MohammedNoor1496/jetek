const mongoose = require('mongoose');
const { Schema } = mongoose;
//order
const order = new Schema({
    user_Phone: {
        type: Number,
        require: true
    },
    captin_phone: {
        type: Number,
        require: false
    },
    sell_point_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'SpAdmin'
    },
    products_id: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Prouduct',
            quantity : Number
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
        type: Number,
        require: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Order', order);