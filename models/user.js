const mongoose = require("mongoose");
const { v1: uuid} = require("uuid");
const crypto = require("crypto");

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
    hash_password: {
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

userSchema.virtual("password")
 .set(function(password) {

    this._password = password;
    this.salt= uuid();
    this.hash_password = this.cryptPassword(password);
 })
 .get(() => {
     return this._password;
 })
 

userSchema.methods = {

    authenticate: function(plainText) {
       
        return this.cryptPassword(plainText) === this.hash_password ;
    },
    cryptPassword(password) {

        if (!password) return '';

        try {

            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')


        } catch (error) {
            return '' ;
        }
    }
}

module.exports = mongoose.model('Users', userSchema);