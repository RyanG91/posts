const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')

const app = express()

// Models
let Post = require('./models/post')

// BodyParser
app.use(bodyParser.json())

// Homepage
app.get('/', function (req, res) {
  res.status(200).send("Welcome to the app, it does so much cool stuff")
})

// Routes
app.use('/posts', require('./routes/postsRoutes')(Post))

// Mongoose
mongoose.connect('mongodb://localhost/post', (err) => {
  if (err) {
    console.log('Error connecting to database', err)
  } else {
    console.log('Connected to database!')
  }
})

// Start the app
app.listen(3000, function() {
  console.log('Listening on port 3000!')
})
