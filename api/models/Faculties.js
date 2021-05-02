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
    extension: String,
    createdAt: {
        type: Date,
        required: true
    }
})

const lectureSchema = new Schema({
    lectureNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    materials: [materialSchema]
})

/*
const answerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    chosenTimes: {
        type: String,
        default: 0
    }
})
*/

const ConditionSchema = new Schema({
    chapter: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
    },
    numberOfQuestions: {
        type: Number,
        required: true
    }
})

const ExamSchema = new Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    examDate: {
        type: Date,
        required: true,
    },
    examEndTime: {
        type: Date,
        required: true,
    },
    chapters: {
        type: Schema.Types.Mixed,
        required: true
    },
    examName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    shortEssay: {
        type: Number,
        required: true
    },
    longEssay: {
        type: Number,
        required: true
    },
    chooseCorrectAnswer: {
        type: Number,
        required: true
    },
    chooseMultipleCorrectAnswers: {
        type: Number,
        required: true
    },
    trueOrFalse: {
        type: Number,
        required: true
    }, 
    conditions: [ConditionSchema]
})

const mediaSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    file: String,
    extension: String,
    createdAt: {
        type: Date,
        required: true
    }
})

const questionSchema = new Schema({
    questionName: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    chapterNumber: {
        type: Number,
        required: true
    },
    questionType: {
        type: String,
        required: true
    },
    answers: Array,
    whoAnswered : {
        type: Number
    },
    whoAnsweredCorrectly: {
        type: Number
    },
    createdAt: {
        type: Date,
        required: true
    },
    media: {
        type: [mediaSchema],
        default: []
    }
    ,
    correctAnswers: {}
})

const questionBankSchema = new Schema({
    chaptersNumber: Number,
    questions: {
        type: [questionSchema],
        default: []
    }

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
    lectures: [lectureSchema],
    questionBank: {
        type: questionBankSchema,
        default: {}
    },
    exams : [ExamSchema]
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