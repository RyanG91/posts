const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const session = require('express-session')
const port = process.env.PORT || 3001

const app = express()

// Models
const Post = require('./models/post')

// use sessions
// this needs to be done AFTER the serialize and deserialize
app.use(session({
  secret: "these are not the droids you're looking for"
}))

// Initialize Passport and connect it into the Express pipline (with .use)
app.use(passport.initialize())
// Connect Passport to the session
app.use(passport.session())

// BodyParser
app.use(bodyParser.json())

// Cors
app.use('/api/', cors())

// Homepage
app.get('/', function (req, res) {
  res.status(200).send("Welcome to the app, it does so much cool stuff")
})

// Routes
app.use('/api/posts', require('./routes/postsRoutes')(Post))
app.use('/api/users', require('./routes/users'))

// Mongoose
mongoose.connect('mongodb://localhost/post', (err) => {
  if (err) {
    console.log('Error connecting to database', err)
  } else {
    console.log('Connected to database!')
  }
})

// Start the app
app.listen(
  port, () => console.log(`Listening on http://localhost:${port}`)
)
