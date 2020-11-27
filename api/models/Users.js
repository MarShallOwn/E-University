const mongoose = require('mongoose')
const { Schema } = mongoose

const resultSchema = new Schema({
    term1: Number,
    term2: Number
})

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    street: String,
    city: String,
    phoneNumber: String,
    picture: {
        type: String,
        default: 'default.png'
    },
    department: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isProf: {
        type: Boolean,
        required: true,
        default: false
    },
    nationalID: {
        type: String,
        maxlength: 14,
        minlength: 14,
        required: true,
        unique: true,
    },
    results: [resultSchema],
    finalResult: Number,
    faculty: {
        type: String,
        required: true
    },
    level: Number,
})


module.exports = mongoose.model('Users', userSchema)