const express = require('express')
const app = express()
const http = require('http')
const mongoose = require('mongoose')
const server = http.createServer(app)
const PORT = process.env.PORT || 8080

mongoose.connect('mongodb://localhost:27017/E-University', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection: error: "));
db.once('open', () => {
    console.log("E-University Database connected!")
});

app.get('/api/', (req, res) => {
    res.send({checking: 'good'})
})


server.listen(PORT, () => console.log(`Server started on port ${PORT}`))