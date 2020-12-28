const mongoose = require('mongoose')
const { Schema } = mongoose

const materialSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    file: String,
    link: String,
    extension: String
})

const lectureSchema = new Schema({
    lectureNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    materials: [materialSchema]
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
    lectures: [lectureSchema]
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
    departments: Array,
    departmentsLevel: {
        type: Number,
        default: null,
        max: 8
    }
})


module.exports = mongoose.model('Faculties', facultySchema)