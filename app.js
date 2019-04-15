const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')

const app = express()

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.status(200).send("Welcome to the app, it does so much cool stuff")
})

// Routes
app.use('/posts', require('./routes/postsRoutes'))

// Mongoose
mongoose.connect('mongodb://localhost/post', (err) => {
  if (err) {
    console.log('Error connecting to database', err)
  } else {
    console.log('Connected to database!')
  }
})

app.listen(3000, function() {
  console.log('Listening on port 3000!')
})
