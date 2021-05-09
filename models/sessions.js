const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    userPohne: {
        type: Number,
        required: true
    },
    userSocketIo: {
        type: String,
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model('session', sessionSchema);
