const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    bookname:{
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    publisher:{
        type: String,
        trim: true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    isbn:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Books', BookSchema);