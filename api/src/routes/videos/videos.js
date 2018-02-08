const router = require('express').Router()
const controller = require('./videos.ctrl')

router.get('/', controller.getAll)

router.post('/', controller.post)

router.put('/:id', controller.put)

module.exports = router
