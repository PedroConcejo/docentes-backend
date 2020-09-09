const UserModel = require('../models/users.model')
const { handleError } = require('../utils')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  signup,
  login
}

function signup (req, res) {
  const hashedPwd = bcrypt.hashSync(req.body.password, 10)
  const userBody = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPwd,
    img: req.body.img,
    location: req.body.location,
    role: req.body.role
  }

  UserModel.create(userBody)
    .then(() => {
      const userData = {
        username: req.body.name,
        email: req.body.email,
        role: req.body.role
      }

      const token = jwt.sign(
        userData,
        process.env.SECRET,
        { expiresIn: '7d' }
      )

      return res.json({ token: token, ...userData })
    })
    .catch(err => {
      res.status(403).json({ error: err })
    })
}

function login (req, res) {
  UserModel.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.json({ error: 'wrong email' })
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) { handleError(err, res) }
        if (!result) {
          return res.json({
            error: `wrong password for ${req.body.email}`
          })
        }

        const userData = { username: user.name, email: user.email, role: user.role }

        const token = jwt.sign(
          userData,
          process.env.SECRET,
          { expiresIn: '7d' }
        )

        return res.json({ token: token, ...userData })
      })
    })
    .catch(err => handleError(err, res))
}
