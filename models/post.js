const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
  title: String,
  content: String,
  created_at: { type: Date, default: Date.now()},
  likes: Number,
  dislikes: Number,
  created_by: String,
  comments: [
    { body: String, createdBy: String, createdAt: { type: Date, default: Date.now() }, likes: Number, dislikes: Number },
    // { createdBy: String },
    // { createdAt: { type: Date, default: Date.now()} },
    // { likes: Number },
    // { dislikes: Number }
  ]
})

module.exports = mongoose.model('Post', Post)