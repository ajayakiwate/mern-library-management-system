const mongoose = require('mongoose');

const IssuedBookSchema = mongoose.Schema({
    bookid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books"
    },
    issuedate:{
        type: Date,
        default: Date.now
    },
    submitdate:{
        type: Date,
        default: undefined
    },
    received:{
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('IssuedBooks', IssuedBookSchema);