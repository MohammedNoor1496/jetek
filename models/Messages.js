const mongoose = require('mongoose');
const {Schema} = mongoose;
const MessageSchema =new Schema({

    senderPhone: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
       
    },
    receiverPhone: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order',
    }
   
}, { timestamps: true });
module.exports = mongoose.model('Message', MessageSchema);
