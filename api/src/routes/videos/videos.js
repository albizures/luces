const router = require('express').Router()
const controller = require('./videos.ctrl')

router.get('/', controller.getAll)
router.get('/youtube/data/:id', controller.getYoutubeData)

router.post('/', controller.post)

router.put('/:id', controller.put)

module.exports = router
