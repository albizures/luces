const router = require('express').Router()

const controller = require('./notifications.ctrl')

router.post('/send', controller.sent)

module.exports = router
