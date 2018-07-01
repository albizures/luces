const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')

exports.getCourses = asyncHandler(async (req, res) => {
  const { id } = req.params
  const courses = await knex('course_subcategories')
    .select({
      id: 'courses.id',
      name: 'courses.name',
      description: 'courses.description',
      image: 'courses.image_url',
      idCategory: 'categories.id',
      categoryName: 'categories.name',
      icon: 'categories.icon',
      author: 'courses.author'
    })
    .join('courses', 'courses.id', 'course_subcategories.id_course')
    .join('categories', 'courses.id_category', 'categories.id')
    .join('subcategories', 'subcategories.id', 'course_subcategories.id_subcategory')
    .where({
      'course_subcategories.id_subcategory': id,
      'course_subcategories.deleted': false,
      'categories.deleted': false,
      'courses.deleted': false
    })
    .orderBy('courses.created_at', 'desc')

  res.json(courses)
})
