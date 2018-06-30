const router = require('express').Router()

const controller = require('./courses.ctrl')

router.get('/', controller.getAll)
router.get('/highlights', controller.getHighlights)
router.get('/search/:search', controller.search)
router.get('/:id', controller.get)
router.get('/:id/videos', controller.getVideos)
router.get('/:id/subcategories', controller.getSubcategories)
router.get('/:id/comments', controller.getComments)

router.post('/', controller.post)
router.post('/:id/comment', controller.postComment)

router.put('/:id', controller.put)
router.put('/:id/videos', controller.putVideos)
router.put('/:id/videos/order', controller.putVideosOrder)
router.put('/:id/subcategories', controller.putSubcategories)

router.delete('/:id', controller.delete)
router.delete('/:id/videos/:videoId', controller.deleteVideo)

module.exports = router
