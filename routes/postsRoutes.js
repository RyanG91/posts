const express = require('express')

let routes = function (Post) {
  let postsRouter = express.Router()
  let postsController = require('../controllers/postsController')(Post)

postsRouter.route('/')
  .post(postsController.post)
  .get(postsController.get)

postsRouter.route('/:postId')
  .delete(postsController.delete)
  .get(postsController.get)

  return postsRouter
}

module.exports = routes
