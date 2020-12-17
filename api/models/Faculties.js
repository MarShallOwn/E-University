const mongoose = require('mongoose')
const { Schema } = mongoose

const weekSchema = new Schema({
    pdf: Array,
    powerpoint: Array,
    videoLinks: Array
})

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    term: {
        type: Number,
        required: true,
    },
    creditHours: {
        type: Number,
        required: true
    },
    professor: {
        type: Object,
        default: {}
    },
    hasSection: {
        type: Boolean,
        required: true
    },
    departments: Array,
    weeks: [weekSchema]
})

const levelSchema = new Schema({
    subjects: [subjectSchema],
    lecturesSchedule: Array,
    sectionsSchedule: Array,
    hasDepartments: {
        type: Boolean,
        default: false,
        required: true
    }
})

const facultySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    levels: [levelSchema],
    currentTerm: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 2
    },
    departments: Array
})


module.exports = mongoose.model('Faculties', facultySchema)