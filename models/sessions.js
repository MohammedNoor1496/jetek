const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    userPhone: {
        type: Number,
        required: false
    },
    captinPhone:{
        type:Number,
        require:false
    },
    userSocketIo: {
        type: String,
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model('session', sessionSchema);
