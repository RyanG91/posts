const express = require('express')
const Post = require('../models/post')

const router = express.Router()

// Creates a new message/post
router.post('/', function (req, res) {
  let posting = new Post(req.body)
  posting.save()
  res.status(201).send(posting)
})

// Gets all posts which have been made, returning as json
router.get('/', function (req, res) {
  let query = {  }

  Post.find(query, function (err, posting) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(posting)
    }
  })
})

module.exports = router