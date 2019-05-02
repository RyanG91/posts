const express = require('express')

let routes = function (Post) {
  let postsRouter = express.Router()
  let postsController = require('../controllers/postsController')(Post)
  const { isRegisteredUser } = require('../middleware/auth')

// Requires uses to login before making a get or post request 
postsRouter.use('/', isRegisteredUser)

postsRouter.route('/')
// Handles the post function for any new Postings
  .post(postsController.post)
// Gets all the Postings
  .get(postsController.get)

postsRouter.route('/:postId')
// Deletes a Posting based on an id
  .delete(postsController.delete)
  .get(postsController.get)

  return postsRouter
}

module.exports = routes
