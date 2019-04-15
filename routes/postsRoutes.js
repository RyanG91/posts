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

router.delete('/:postId', function (req, res) {
  Post.findById(req.params.postId, function (err, posting) {
    if (err) {
      res.status(500).send(err)
    } else {
      if (posting) {
        posting.remove(function (remErr) {
          if (remErr) {
            res.status(500).send(remErr)
          } else {
            res.status(204).send('removed')
          }
        })
      } else {
        res.status(500).send('Did not get post to delete')
      }
    }
  })
})

router.get('/:postId', function (req, res) {
  Post.findById(req.params.postingId, function (err, posting) {
    if (err) {
      res.status(500).send(err)
    } else if (posting) {
      res.json(posting)
    } else {
      res.status(404).send('Post not found')
    }
  })
})

module.exports = router