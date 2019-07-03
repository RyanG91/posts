const express = require('express')
const Post = require('../models/post')
const router = express.Router()

// GET all posts
router.get('/', (req, res) => {
  Post.find()
    .then(posting => res.json(posting))
    .catch(error => res.sendStatus(500).json({ error: error.message }))
})

// POST a post
router.post('/', (req, res) => {
  if(req.body.title && req.body.content) {
    let posting = new Post(req.body)
    posting.save()
    res.status(201)
    res.send(posting)
  } else {
    res.status(400)
    res.send('Title and Content are required')
  }
})

// Routes based on postId's

// GET a single post based on its id
router.get('/:postId', (req, res) => {
  if(req.params.postId) {
    Post.findById(req.params.postId, function (err, posting) {
      if (err) {
        res.status(500).send(err)
      } else if (posting) {
        res.json(posting)
      } else {
        res.status(404).send('Post not found')
      }
    })
  }
})

// Updates a post based on its ID
router.put('/:postId', (req, res) => {
  Post.findByIdAndUpdate(req.params.postId, req.body)
  .then(res.send(200))
  .catch(error => res.sendStatus(500).json({ error: error.message }))
})

// DELETE a post based on its id
router.delete('/:postId', (req, res) => {
  Post.findByIdAndRemove(req.params.postId)
    .then(() => res.sendStatus(204))
    .catch(error => res.status(500).json({ error: error.messaage }))
})

// GET a post based on its id
router.get('/:postId', (req, res) => {
  if(req.params.postId) {
    Post.findById(req.params.postId, function (err, posting) {
      if (err) {
        res.status(500).send(err)
      } else if (posting) {
        res.json(posting)
      } else {
        res.status(404).send('Post not found')
      }
    })
  }
})

// Comments for each post

// POST a comment for individual posts
router.post('/:postId/comments', (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    { $push: { comments: req.body.comments }
  }).then(function () {
    res.status(201)
    res.json({ success: true })
  })
})

// DELETE a specific comment based on its id through the post id
router.delete('/:postId/comments/:commentId', (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    { $pull: { comments: { _id: req.params.commentId } }
  })
    .then(() => res.sendStatus(204))
    .catch(error => res.status(500).json({ error: error.messaage }))
})

// GET a comment based on its id and post id
router.get('/:postId/comments/:commentId', (req, res) => {
  // if (req.params.postId) {
    Post.findOne(
      { _id: req.params.postId },
      { comments: { $elemMatch: { _id: req.params.commentId} }}
    )
    .then(( comment ) => res.json( comment ))
    .catch(error => res.status(500).json({ error: error.messaage }))
  // }
})



/*
let routes = function (Post) {
  let postsRouter = express.Router()

  let postsController = require('../controllers/postsController')(Post)
  // const { requireJwt } = require('../middleware/auth')

// Requires uses to login before making a get or post request 
// postsRouter.use('/', requireJwt)

postsRouter.route('/')
// Handles the post function for any new Postings
  .post(postsController.post)
// Gets all the Postings
  .get(postsController.get)

postsRouter.route('/:postId')
// Deletes a Posting based on an id
  .delete(postsController.delete)
// Gets a single Posting based on the id
  .get(postsController.get)
// Edits a Posting based on the id
  .put(postsController.put)

postsRouter.route('/:postId/comments')
// Adds comments based on the post id
  .post(postsController.post)

postsRouter.route('/:postId/comments')
// Gets all comments based on its id
  .get(postsController.get)

  return postsRouter
}
*/

module.exports = router
