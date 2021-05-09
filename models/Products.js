const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'catogarys'
    },
    sell_point_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'SpAdmins'
    },
    name: {
        type: String,
        required: true
    }, photo: {
        type: String,
        required: false
    }, price: {
        type: Number,
        required: true
    }, rate: {
        type: String,
        required: false
    },
}, { timestamps: true });


module.exports = mongoose.model('Prouduct', productSchema);