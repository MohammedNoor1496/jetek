const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pCatogarySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cptImage: {
        type: String,
        required: true,
    },
}, { timestamps: true })
module.exports = mongoose.model('spCatogarie', pCatogarySchema);