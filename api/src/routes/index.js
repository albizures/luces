const jwt = require('express-jwt')
const { Router } = require('express')

const router = Router()

router.use('/', jwt({ secret: process.env.SECRET_KEY }).unless({path: [
  '/api/categories',
  '/api/login',
  '/api/login/password'
]}))
router.use('/login', require('./login/login'))
router.use('/videos', require('./videos/videos'))
router.use('/favorites', require('./favorites/favorites'))
router.use('/comments', require('./comments/comments'))
router.use('/categories', require('./categories/categories'))
router.use('/subcategories', require('./subcategories/subcategories'))
router.use('/courses', require('./courses/courses'))
router.use('/images', require('./images/images'))
router.use('/interests', require('./interests/interests'))

// router.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.status(404).send()
//   } else {
//     next()
//   }
// })

module.exports = router
