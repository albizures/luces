const router = require('express').Router()

const controller = require('./login.ctrl')

router.get('/me', controller.getProfile)

router.post('/', controller.login)
router.post('/signup', controller.signUp)
router.post('/password', controller.loginPassword)

module.exports = router
