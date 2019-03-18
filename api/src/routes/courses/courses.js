const jwt = require('express-jwt')
const multer = require('multer')
const router = require('express').Router()

const controller = require('./courses.ctrl')
const { storage } = require('../../config/multer')

const authRoute = jwt({ secret: process.env.SECRET_KEY })
const authlessRoute = jwt({ secret: process.env.SECRET_KEY, credentialsRequired: false })

const upload = multer({ storage, limits: { fieldSize: 20 * 1024 * 1024 } })

router.get('/', authlessRoute, controller.getAll)
router.get('/highlights', controller.getHighlights)
router.get('/latest', controller.getLatest)
router.get('/search/:search', controller.search)
router.get('/:id', authlessRoute, controller.get)
router.get('/:id/videos', controller.getVideos)
router.get('/:id/subcategories', controller.getSubcategories)
router.get('/:id/comments', authlessRoute, controller.getComments)

router.post('/', authRoute, controller.post)
router.post('/:id/comment', authRoute, controller.postComment)
router.post('/:id/comment/image', authRoute, upload.single('image'), controller.postComment)

router.put('/:id', authRoute, controller.put)
router.put('/:id/videos', authRoute, controller.putVideos)
router.put('/:id/videos/order', authRoute, controller.putVideosOrder)
router.put('/:id/subcategories', authRoute, controller.putSubcategories)

router.delete('/:id', authRoute, controller.delete)
router.delete('/:id/videos/:videoId', authRoute, controller.deleteVideo)

module.exports = router
