const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const spAdminSchema = new Schema({
    cpName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spCatogaries',
        require: true
    },
    commercialRegister: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    status:{
        type: Boolean,
        default: false
    },
    cpImage: {
        type: String,
        required: false,
    },
    isConfirmed: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

spAdminSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

module.exports = mongoose.model('SpAdmin', spAdminSchema);