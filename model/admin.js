const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'Please Enter your name']
    },
    lname: {
        type: String,
        required: [true, 'Please Enter your name']
    },
    email: {
        type: String,
        required: [true, 'Email is not entered yet'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email !']
    },
    role: {
        type: String,
        default:'admin'
    },
    password: {
        type: String,
        required: [true, 'Enter Password'],
        minlength: 8,
        select:false
    },
    confirmPass: {
        type: String,
        // required: [true, 'please Re-enter your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message:"password unmatched! please check !"
        }
    },
    passChangeAt: Date,
    passResetToken: String,
    resetTokenExp : Date
});

adminSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPass = undefined;
    
    next();

});

adminSchema.methods.correctPass =async function(gPass, ePass) {
    return await bcrypt.compare(gPass, ePass);
}


const admin = mongoose.model('Adim', adminSchema)

module.exports = admin;