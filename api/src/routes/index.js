const router = require('express').Router()

router.use('/videos/', require('./videos/videos'))
router.use('/categories/', require('./categories/categories'))

module.exports = router
