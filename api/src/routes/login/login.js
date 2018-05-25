const router = require('express').Router()

const controller = require('./login.ctrl')

router.post('/', controller.login)

module.exports = router
