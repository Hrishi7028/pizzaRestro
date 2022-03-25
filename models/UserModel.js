const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true,
        trim: true
    },
    Lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    isAdmin: {
        type: String,
        default: 'user'
    },
    mobile: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);