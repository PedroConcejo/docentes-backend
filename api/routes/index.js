const router = require('express').Router()

const authRouter = require('./auth.router')
const usersRouter = require('./users.router')
const meRouter = require('./me.router')

const { authUser, roleControl } = require('../utils')

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/me', authUser, meRouter)

router.get('/whoami', authUser, (req, res) => {
  res.send(res.locals.user)
})

router.get('/rolecontrol', roleControl, (req, res) => {
  res.send('Welcome Business Man')
})

module.exports = router
