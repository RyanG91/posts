const express = require('express')
const Post = require("../models/post")

let routes = function (Post) {
  let postsRouter = express.Router()

  let commentsRouter = express.Router({mergeParams: true})

  postsRouter.use('/:postId/comments', commentsRouter)

  commentsRouter.route('/')
    .get(function (req, res) {
      res.status(200)
        .send('hello comments form post ' + req.params.postId)
    })


    // Post.findById(req.params.postId, function (err, posting) {
    //   if (err) {
    //     res.status(500).send(err)
    //   } else if (posting) {
    //     res.json(posting)
    //   } else {
    //     res.status(404).send('Post not found')
    //   }
    // })

  // commentsRouter.route('/:commentsId')
  //   .get(function (req, res) {
  //     Post.findById(req.params.id)
  //       .then(comments => res.json(comments))
  //       .catch(error => res.sendStatus(500).json({ error: error.message })

  //     // res.status(200)
  //     //   .send('hello comment ' + req.params.commentsId + ' from post ' + req.params.postId)
  //   })

  // commentsRouter.get('/:commentsId', (req, res) => {
  //   Post.findById(req.params.id)
  //     .then(comments => res.json(comments))
  //     .catch(error => res.sendStatus(500).json({ error: error.message }))
  // })


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
// ----------------- The Route I'm working on -----------------------------------------------
// Adds comments based on the post id
  .post(postsController.post)

  return postsRouter
}

module.exports = routes
