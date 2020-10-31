const mongoose = require('mongoose');

const categoryShema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 38,
        trim: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Category', categoryShema);