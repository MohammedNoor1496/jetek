const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const captinSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    phone: { type: Number, require: true, unique: true },
    identity: { type: Number, require: true, unique: true },
    drivingLicense: { type: String, require: true },
    vehicleLicense: { type: String, require: true },
    balance: { type: Number, require: true },
    photo: { type: String, require: false },
    birthday: { type: Date, require: true },
    confirmed: { type: Boolean, require: true, default: false }, //for confirming phone number from captin application 
    verified: { type: Boolean, require: true, default: false },//for confirming identity number from admin panel 
    status: { type: Boolean, require: true, default: false }, //active status (online or offline )
    lat: { type: Number, require: false },
    lng: { type: Number, require: false },
    sortDate: { type: Date },
    sentOtp: { type: Number }
}, { timestamps: true })

module.exports = mongoose.model('Captin', captinSchema)