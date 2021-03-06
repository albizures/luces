const router = require('express').Router()
const controller = require('./interests.ctrl')

router.get('/user', controller.getAllUserInterests)

router.post('/user', controller.post)

router.put('/user', controller.put)

module.exports = router
