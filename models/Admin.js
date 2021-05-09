const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 50,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50,
        unique: false
    },
    phone: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        unique: false
    }, roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    isConfirmed: {
        type: Boolean
    }, sortDate: { type: Date },
}, { timestamps: true });


// 4. Encypt and store the person's password
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin, isSubAdmin: this.isSubAdmin }, process.env.ADMIN_ACCESS_TOKEN_SECRET);

    return token;
}
UserSchema.index({ sortDate: 1, email: 1 });
function validateUser(user) {
    const Schema = {
        firstName: Joi.string().max(50).required(),
        lastName: Joi.string().max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().required(),
    };

    return Joi.validate(user, Schema);
}
module.exports = mongoose.model('Admin', UserSchema);
exports.validate = validateUser;