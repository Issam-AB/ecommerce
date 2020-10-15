const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        maxlength: 50,
        trim: true,
        required: true
    },
    email: {

        type: String,
        maxlength: 50,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true })