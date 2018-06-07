const router = require('express').Router()

const controller = require('./comments.ctrl')

router.post('/:id/like', controller.postLike)

module.exports = router
