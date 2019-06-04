const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
  title: String,
  content: String,
  created_at: { type: Date, default: Date.now()},
  likes: Number,
  dislikes: Number
})

module.exports = mongoose.model('Post', Post)