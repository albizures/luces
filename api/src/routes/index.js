const router = require('express').Router()

router.use('/videos/', require('./videos/videos'))
router.use('/categories/', require('./categories/categories'))
router.use('/courses/', require('./courses/courses'))
router.use('/images/', require('./images/images'))

module.exports = router
