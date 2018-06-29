const router = require('express').Router()
const controller = require('./categories.ctrl')

router.get('/', controller.getAll)
router.get('/:id/subcategories', controller.getSubcategories)

router.post('/', controller.post)

router.put('/:id', controller.put)

router.delete('/:id', controller.delete)

module.exports = router
