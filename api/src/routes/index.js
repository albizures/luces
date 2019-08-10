const jwt = require('express-jwt')
const { Router } = require('express')

const router = Router()

const authRoute = jwt({ secret: process.env.SECRET_KEY })

router.use('/login', require('./login/login'))
router.use('/videos', authRoute, require('./videos/videos'))
router.use('/favorites', authRoute, require('./favorites/favorites'))
router.use('/comments', require('./comments/comments'))
router.use('/categories', require('./categories/categories'))
router.use('/subcategories', require('./subcategories/subcategories'))
router.use('/courses', require('./courses/courses'))
router.use('/images', authRoute, require('./images/images'))
router.use('/notifications', authRoute, require('./notifications/notifications'))
router.use('/interests', authRoute, require('./interests/interests'))

router.use(function (error, req, res, next) {
  console.error(error.message, error.response, error.response && error.response.body)
  res.status(500).json({ message: error.message })
})

module.exports = router
