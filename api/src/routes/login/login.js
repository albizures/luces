const router = require('express').Router()

const controller = require('./login.ctrl')

router.post('/', controller.login)
router.post('/password', controller.loginPassword)

module.exports = router
