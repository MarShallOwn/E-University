const mongoose = require('mongoose')
const { Schema } = mongoose

let messageSchema = new Schema({
    from: {
        type: Object,
        required: true
    },
    message: {
        type: String,
        required: true,
        minlength: 1
    }
})

let roomSchema = new Schema({
    participants: Array,
    messages: [messageSchema],
    createdAt: Date
})


module.exports = mongoose.model('Rooms', roomSchema)