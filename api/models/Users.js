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
    correctAnswers: {},
    userAnswer: {},
    correct: {
        type: String,
        required: true,
        default: ""
    }
})


const examSchema = new Schema({
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
    conditions: [ConditionSchema],
    examMark: {
        type: Number,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    }
})


module.exports = mongoose.model('Users', userSchema)