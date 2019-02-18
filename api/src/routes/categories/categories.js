const jwt = require('express-jwt')
const router = require('express').Router()
const controller = require('./categories.ctrl')

const authMiddleware = jwt({ secret: process.env.SECRET_KEY })

router.get('/', controller.getAll)
router.get('/:id/subcategories', controller.getSubcategories)
router.get('/:id/highlights', controller.getHighlights)

router.post('/', authMiddleware, controller.post)

router.put('/:id', authMiddleware, controller.put)

router.delete('/:id', authMiddleware, controller.delete)

module.exports = router
