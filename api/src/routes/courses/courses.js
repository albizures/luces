const router = require('express').Router()

const controller = require('./courses.ctrl')

router.get('/', controller.getAll)
router.get('/:id/videos', controller.getVideos)

router.post('/', controller.post)

router.put('/:id', controller.put)

router.delete('/:id', controller.delete)

module.exports = router
