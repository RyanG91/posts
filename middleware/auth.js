const passport = require('passport')
const User = require('../models/user')

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const register = (req, res) => {
  User.register(new User({ 
    email: req.body.email, 
    role: req.body.role || 'user'
  }), req.body.password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    res.status(200).json(user)
  })
}

const login = (req, res) => {
  // Set the session role to the user role so we can use it for authorization
  req.session.role = req.user.role || 'guest' // default to guest if no user or role
  res.status(200).json(req.user)

  
// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.status(200).json(req.user)
// })
}

const logout = (req, res) => {
  req.logout()
  req.session.role = 'guest'
  res.sendStatus(200)
}

const isRegisteredUser = (req, res, next) => {
  if (req.session.role && (req.session.role == 'user')) {
    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = {
  authenticate: passport.authenticate('local'),
  register,
  login,
  logout,
  isRegisteredUser
}