const router = require('express').Router()

const controller = require('./comments.ctrl')

router.post('/:id/like', controller.postLike)
router.delete('/:id/like', controller.deleteLike)

module.exports = router
