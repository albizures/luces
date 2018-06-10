const router = require('express').Router()

const controller = require('./favorites.ctrl')

router.get('/', controller.getAll)

router.post('/', controller.post)

router.delete('/:id_course', controller.delete)

module.exports = router
