let should = require('should'),
    sinon = require('sinon')

describe('Test POST title', function () {
  it('should return a 400 status and send Title and Content are required if no title is passed', function () {
    // Mock the post model - our .post requires a save function and nothing else
    let Post = function (posting) {
      this.save = function () {  }
    }
    let req = {
      body: {
        content: "First post"
      }
    }
    let res = {
      status: sinon.spy(),
      send: sinon.spy()
    }

    let postsController = require('../controllers/postsController')(Post)
    postsController.post(req, res)

    res.status.calledWith(400).should.equal(true, `Wrong status: ${res.status.args}`)
    res.send.calledWith('Title and Content are required').should.equal(true)
  })
})

describe('Test POST content', function () {
  it('should return a 400 status and send Title and Content are required if no content is passed', function () {
    // Mock the post model - our .post requires a save function and nothing else
    let Post = function (posting) {
      this.save = function () {  }
    }
    let req = {
      body: {
        title: "First post"
      }
    }
    let res = {
      status: sinon.spy(),
      send: sinon.spy()
    }

    let postsController = require('../controllers/postsController')(Post)
    postsController.post(req, res)

    res.status.calledWith(400).should.equal(true, `Wrong status: ${res.status.args}`)
    res.send.calledWith('Title and Content are required').should.equal(true)
  })
})