const passport = require('passport')
const User = require('../models/user')

const JWT = require('jsonwebtoken')
const passportJwt = require('passport-jwt')
require('dotenv').config()

const jwtSecret = process.env.JWT_SECRET // Should come from .env
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '3h'

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

passport.use(new passportJwt.Strategy({
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  algorithms: [jwtAlgorithm]
}, (payload, done) => {
  User.findById(payload.sub).then((user) => {
    if (user) {
      user.token = payload
      done(null, user)
    } else {
      done(null, false)
    }
  }).catch((error) => {
    done(error, false)
  })
}))

// use static serialize and deserialize of model for passport session support
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// Registers new users and assigns them role 'user' but doesn't login
const register = (req, res, next) => {
  User.register(new User({ 
    email: req.body.email, 
    role: req.body.role || 'user'
  }), req.body.password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message)
    }
    // Add user to request so that later middleware can access it
    req.user = user
    next()
  })
}

const login = (req, res) => {
  // Set the session role to the user role so we can use it for authorization
  req.session.role = req.user.role || 'guest' // default to guest if no user or role
  res.status(200).json(req.user)
}

const signJwtForUser = (req, res) => {
  // Use JWT to create a signed token
  const token = JWT.sign(
    // Payload
    {
      sub: req.user._id.toString(),
      email: req.user.email
    },
    // Secret
    jwtSecret,
    // Config (may include header values)
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn
    }
  )

  res.json({ token: token })
}

// const logout = (req, res) => {
//   req.logout()
//   // guest role cannot do get or post requests
//   req.session.role = 'guest'
//   res.sendStatus(200)
// }

// const isRegisteredUser = (req, res, next) => {
//   if (req.session.role && (req.session.role == 'user')) {
//     next()
//   } else {
//     res.sendStatus(403)
//   }
// }

module.exports = {
  initializePassport: passport.initialize(),
  requireJwt: passport.authenticate('jwt', { session: false }),
  // authenticate: passport.authenticate('local'),
  login: passport.authenticate('local', { session: false }),
  register,
  signJwtForUser,
  // logout,
  // isRegisteredUser
}