const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

const userSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    phone: { type: Number, require: true, unique: true },
    balance: { type: Number, require: true },
    photo: { type: String, require: false },
    birthday: { type: Date, require: true },
    confirmed: { type: Boolean, require: true, default: true },
    isDriver: { type: Boolean, require: false, default: false },
    home_lat: { type: Number, require: false },
    home_lng: { type: Number, require: false },
    work_lat: { type: Number, require: false },
    work_lng: { type: Number, require: false },
    sortDate: { type: Date },
    sentOtp: { type: Number }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema)