const router = require('express').Router()

router.use('/videos/', require('./videos/videos'))

module.exports = router
