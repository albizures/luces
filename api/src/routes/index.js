const jwt = require('express-jwt')
const { Router } = require('express')

const router = Router()

const authRoute = jwt({ secret: process.env.SECRET_KEY })

router.use('/login', require('./login/login'))
router.use('/videos', authRoute, require('./videos/videos'))
router.use('/favorites', authRoute, require('./favorites/favorites'))
router.use('/comments', authRoute, require('./comments/comments'))
router.use('/categories', require('./categories/categories'))
router.use('/subcategories', require('./subcategories/subcategories'))
router.use('/courses', require('./courses/courses'))
router.use('/images', authRoute, require('./images/images'))
router.use('/interests', authRoute, require('./interests/interests'))

// router.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.status(404).send()
//   } else {
//     next()
//   }
// })

module.exports = router
