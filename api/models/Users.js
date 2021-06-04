const mongoose = require('mongoose')
const crypto = require('crypto')
const { Schema } = mongoose


const resultSchema = new Schema({
    term1: Number,
    term2: Number
})

const ConditionSchema = new Schema({
    chapter: {
        type: Number,
    },
    type: {
        type: String,
    },
    difficulty: {
        type: String,
    },
    numberOfQuestions: {
        type: Number,
    }
})


const mediaSchema = new Schema({
    type: {
        type: String,
    },
    file: String,
    extension: String,
    createdAt: {
        type: Date,
    }
})

const questionSchema = new Schema({
    questionName: {
        type: String,
    },
    difficulty: {
        type: String,
    },
    chapterNumber: {
        type: Number,
    },
    questionType: {
        type: String,
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
    },
    media: {
        type: [mediaSchema],
        default: []
    }
    ,
    correctAnswers: {},
    userAnswer: {},
    correct: {
        type: String,
        default: ""
    }
})


const examSchema = new Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    duration: {
        type: String,
    },
    examDate: {
        type: Date,
    },
    examEndTime: {
        type: Date,
    },
    chapters: {
        type: Schema.Types.Mixed,
    },
    examName: {
        type: String,
    },
    studentExamEnter: {
        type: Date
    },
    type: {
        type: String,
    },
    shortEssay: {
        type: Number,
    },
    longEssay: {
        type: Number,
    },
    chooseCorrectAnswer: {
        type: Number,
    },
    chooseMultipleCorrectAnswers: {
        type: Number,
    },
    trueOrFalse: {
        type: Number,
    }, 
    conditions: [ConditionSchema],
    examMark: {
        type: Number,
    },
    subjectName: {
        type: String,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    done: {
        type: Boolean,
        default: false
    },
    graded: {
        type: String,
        default: "no"
    },
    currentMark: {
        type: Number,
        default: 0
    },
    examChance: {
        type: Number,
        default: 2
    },
    level: {
        type: Number,
    },
    questions: [questionSchema]
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
        default: 'e-university-profile-pictures/default-image_qtdxwi'
    },
    department: {
        type: String,
        trim: true
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
    exams: {
        type: [examSchema],
        default: []
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
})


module.exports = mongoose.model('Users', userSchema)