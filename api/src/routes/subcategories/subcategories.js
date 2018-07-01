const router = require('express').Router()
const controller = require('./subcategories.ctrl')

router.get('/:id/courses', controller.getCourses)

// router.post('/', controller.post)

module.exports = router
