const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    usn:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        uniqueCaseInsensitive: true
    },
    emailid:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        trim: true,
        default: 'dhi123',
        required: true
    },
    fullname:{
        type: String,
        trim: true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    mobileno:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    },
    fine:{
        type: Number,
        default: 0
    },
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "IssuedBooks"
    }]
});


module.exports = mongoose.model('Users', UserSchema);