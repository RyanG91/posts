const express = require('express')
const router = express.Router()

const { register, login, signJwtForUser } = require('../middleware/auth')

// Register new user
router.post('/register', register, signJwtForUser)

// Authenticate and login user
router.post('/login', login, signJwtForUser)

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.session.role = 'guest'
  res.sendStatus(200)
});

module.exports = router