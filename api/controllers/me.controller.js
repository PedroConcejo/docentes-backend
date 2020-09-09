const UserModel = require('../models/users.model')
const bcrypt = require('bcrypt')

const { handleError } = require('../utils')

module.exports = {
  getMe,
  updateUser,
  deleteMe,
  changePassword,
  newmsg,
  clearmsg
}

function getMe (req, res) {
  UserModel
    .findById({ _id: res.locals.user._id })
    .populate('location')
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}
function updateUser (req, res) {
  UserModel
    .findByIdAndUpdate(res.locals.user._id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function deleteMe (req, res) {
  UserModel
    .remove({ _id: res.locals.user._id })
    .then(response => res.json(response))
    .catch(err => handleError(err, res))
}

function changePassword (req, res) {
  UserModel
    .findById(res.locals.user._id)
    .then(user => {
      bcrypt.compare(req.body.actualPassword, user.password, (err, result) => {
        if (err) {
          return handleError(err)
        }
        if (!result) {
          return res.json({
            error: `Wrong password for ${user.name}`
          })
        }
        const newPassword = bcrypt.hashSync(req.body.newPassword, 10)
        user.password = newPassword
        user.save()
          .then(response => res.json(response))
          .catch((err) => handleError(err, res))
      })
    })
}

function newmsg (req, res) {
  UserModel
    .findByIdAndUpdate(req.params.id, { $inc: { msg: 1 } }, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function clearmsg (req, res) {
  UserModel
    .findByIdAndUpdate(res.locals.user._id, { $set: { msg: 0 } }, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}
