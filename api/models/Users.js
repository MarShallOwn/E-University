const mongoose = require('mongoose')
const { Schema } = mongoose

const resultSchema = new Schema({
    term1: Number,
    term2: Number
})

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        trim: true
    },
    street: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    picture: {
        type: String,
        trim: true,
        default: 'chat-app-profile-pictures/default-image_qtdxwi'
    },
    department: {
        type: String,
        trim: true,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false,
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
        trim: true,
        unique: true,
    },
    results: [resultSchema],
    finalResult: Number,
    faculty: {
        type: String,
        trim: true,
        required: true
    },
    level: Number,
})


module.exports = mongoose.model('Users', userSchema)