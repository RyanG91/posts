const express = require('express')
const router = express.Router()

const { register, login, logout, authenticate } = require('../middleware/auth')

// Register new user
router.post('/register', register)

// Authenticate and login user
router.post('/login', authenticate, login)

// Logout
router.get('/logout', logout)

module.exports = router