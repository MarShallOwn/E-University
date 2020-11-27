const express = require('express')
const app = express()
const http = require('http')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
const sanitize = require('mongo-sanitize')
const initalizePassport = require('./passport-config')
const userModel = require('./models/Users')
const server = http.createServer(app)
const bcrypt = require('bcrypt')
const PORT = process.env.PORT || 8080

mongoose.connect('mongodb://localhost:27017/E-University', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection: error: "));
db.once('open', () => {
    console.log("E-University Database connected!")
});

initalizePassport(passport)


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: 'iaundouandiansonsoansuoands',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

/*
const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }

    return res.redirect('/login');
}
const checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    next();
}
*/

/**
 * data entry to add users data to the database
 */
app.post('/api/storeUser', async (req, res) => {
    const {firstname, lastname, nationalID, faculty, level, department} = req.body.data

    /**
     * Sanitize user input first
     */
    nationalID = sanitize(nationalID)

    if(await userModel.findOne({nationalID})){
        return res.send({status: 404, message: 'user already registered !'})
    }

    const user = new userModel({
        firstname,
        lastname,
        faculty,
        nationalID,
        level,
        department
    })
    await user.save();

    return res.send({status: 200, message: 'user stored!'})
})

/**
 * user sign up with national id
 */
app.post('/api/registerUser', (req, res) => {

    const {nationalID} = req.body.data

    /**
     * Sanitize user input first
     */
    nationalID = sanitize(nationalID)

    userModel.findOne({nationalID}, (err, user) => {

        if(user && !user.email){
            return res.send({status: 200, continue: true})
        }
        else{
            const reason = user ? 'email' : 'no user';
            return res.send({status: 404, continue: false, reason})
        }
    })
})

/**
 * if the national id is correct then proceed the register with more data inputs
 */
app.post('/api/continueRegister', async (req, res) => {

    const {email, password, confirmPassword, street, city, phoneNumber, nationalID} = req.body.data

    if(password !== confirmPassword){
        return res.send({status: 404, pass: false})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    /**
     * Sanitize user input first
     */
    nationalID = sanitize(nationalID)
    
    userModel.findOne({nationalID}, (err, user) => {
        if(!err && !user.email){
            user.email = email
            user.password = hashedPassword
            user.street = street
            user.city = city
            user.phoneNumber = phoneNumber
            user.save()
            return res.send({status:200, pass: true})
        }
        else{
            const reason = user.email ? 'email' : 'no user';
            return res.send({status:404, pass: false, reason})
        }
    })

})

/**
 * Login user with meail and password
 */
app.post('/api/login', passport.authenticate('local', { successRedirect: '/api/success', failureRedirect: '/api/failure' }))

/**
 * If user login is successfull
 */
app.get('/api/success', (req, res) => {
    res.send({status: 200, pass: true})
})

/**
 * If user login is unsesuccessfull
 */
app.get('/api/failure', (req, res) => {
    res.send({status: 200, pass: false})
})

/**
 * Get logged in user data
 */
app.get('/api/user', (req, res) => {
    let user;
    if(req.user){
        const {firstname, lastname, email, city, phoneNumber, picture, department, isProf, faculty, level} = req.user
        user = {firstname, lastname, email, city, phoneNumber, picture, department, isProf, faculty, level}
    }

    if(user){
        return res.send({pass: true, user})
    }
    else{
        return res.send({pass: false})
    }

})

/**
 * Logout user
 */
app.get('/api/logout', (req, res) => {

    req.logout()

    res.send({status: 200, pass: true})
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))