const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    sortDate: { type: Date },

}, { timestamps: true })
