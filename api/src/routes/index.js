const router = require('express').Router()

router.use('/videos', require('./videos/videos'))
router.use('/categories', require('./categories/categories'))
router.use('/courses', require('./courses/courses'))
router.use('/images', require('./images/images'))

router.use('/login', require('./login/login'))

module.exports = router
