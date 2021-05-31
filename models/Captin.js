const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const captinSchema = new Schema({
    fullName: { type: String, require: true },
    phone: { type: Number, require: true, unique: true },
    identity: { type: Number, require: true, unique: true },
    bankIban: { type: String, require: true, unique: true },
    drivingLicense: { type: String, require: true },
    vehicleLicense: { type: String, require: true },
    vehicleType: { type: String, require: true },
    vehicleYear: { type: Number, require: true },
    frontOfvehicle: { type: String, require: true },
    backOfvehicle: { type: String, require: true },
    leftSideOfvehicle: { type: String, require: true },
    rightSideOfvehicle: { type: String, require: true },
    plateNmuber: { type: String, require: true },
    email: { type: String, require: true },
    balance: { type: Number, require: false },
    photo: { type: String, require: false },
    Address: { type: String, require: false },
    birthday: { type: Date, require: true },
    confirmed: { type: Boolean, require: true, default: false }, //for confirming phone number from captin application 
    verified: { type: Boolean, require: true, default: false },//for confirming identity number from admin panel 
    status: { type: Boolean, require: true, default: false }, //active status (online or offline )
    lat: { type: Number, require: false },
    lng: { type: Number, require: false },
    sortDate: { type: Date },
}, { timestamps: true })

module.exports = mongoose.model('Captin', captinSchema)