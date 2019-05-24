const express = require('express')

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

  return postsRouter
}

module.exports = routes
