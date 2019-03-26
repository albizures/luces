const jwt = require('express-jwt')
const router = require('express').Router()

const controller = require('./comments.ctrl')

const authRoute = jwt({ secret: process.env.SECRET_KEY })
const authlessRoute = jwt({ secret: process.env.SECRET_KEY, credentialsRequired: false })

router.get('/:id/comments', authlessRoute, controller.getComments)

router.post('/:id/like', authRoute, controller.postLike)
router.delete('/:id/like', authRoute, controller.deleteLike)

module.exports = router
