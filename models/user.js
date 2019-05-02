const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Passport-Local Mongoose will add a username, hash and salt field to store the
// username, the hashed password and the salt value. Additionally Passport-Local
// Mongoose adds some methods to your Schema.
const passportLocalMongoose = require('passport-local-mongoose')

// We'll start with an empty schema, since we only want the fields provided by Passport for now
// We can add custom fields for our User model later.
const User = new Schema({
  role: String
})

// connect passportLocalMongoose to the User schema and user 'email' instead of 'username'
User.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', User)