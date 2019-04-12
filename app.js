const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.get('/', function (req, res) {
  res.send("Welcome to the app, it does so much cool stuff")
})

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
