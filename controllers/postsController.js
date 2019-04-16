let postsController = function (Post) {
  let post = function (req, res) {
    // New post
    if(req.body.title && req.body.content) {
      let posting = new Post(req.body)
      posting.save()
      res.status(201)
      res.send(posting)
    } else {
      res.status(400)
      res.send('Title and Content are required')
    }
  }
  let get = function (req, res) {
    // Get a post based on ID
    if(req.params.postingID) {
      Post.findById(req.params.postingId, function (err, posting) {
        if (err) {
          res.status(500).send(err)
        } else if (posting) {
          res.json(posting)
        } else {
          res.status(404).send('Post not found')
        }
      })
    } else {
    // Get all posts
      let query = {}
      Post.find(query, function (err, posting) {
        if (err) {
          res.status(500).send(err)
        } else {
          res.json(posting)
        }
      })
    }
  }
  let deleteFunction = function (req, res) {
    // Deletes a post based on an id
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
  }
  return {
    post: post,
    get: get,
    delete: deleteFunction
  }
}

module.exports = postsController
