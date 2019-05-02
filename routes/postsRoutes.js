const express = require('express')

let routes = function (Post) {
  let postsRouter = express.Router()
  let postsController = require('../controllers/postsController')(Post)
  const { isRegisteredUser } = require('../middleware/auth')

postsRouter.use('/', isRegisteredUser)

postsRouter.route('/')
  .post(postsController.post)
  .get(postsController.get)

postsRouter.route('/:postId')
  .delete(postsController.delete)
  .get(postsController.get)

  return postsRouter
}

module.exports = routes
