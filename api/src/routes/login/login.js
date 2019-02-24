const router = require('express').Router()
const jwt = require('express-jwt')

const controller = require('./login.ctrl')
const authRoute = jwt({ secret: process.env.SECRET_KEY })

router.get('/me', authRoute, controller.getProfile)

router.post('/', controller.login)
router.post('/signup', controller.signUp)
router.post('/password', controller.loginPassword)

module.exports = router
