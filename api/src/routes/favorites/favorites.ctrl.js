const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')

exports.getAll = asyncHandler(async (req, res) => {
  const { id_user } = req.user
  const courses = await knex('favorites')
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
    .join('courses', 'courses.id', 'favorites.id_course')
    .join('categories', 'courses.id_category', 'categories.id')
    // .leftJoin('course_videos', 'courses.id', 'course_videos.id_course')
    .where({
      'favorites.id_user': id_user,
      'favorites.deleted': false,
      'courses.deleted': false
      // 'course_videos.deleted': true
    })
    .orderBy('favorites.created_at', 'desc')

  res.json(courses)
})

exports.post = asyncHandler(async (req, res) => {
  const { id: id_course } = req.body
  const { id_user } = req.user
  await knex('favorites')
    .insert({
      id_course,
      id_user
    })

  res.json({ id_course })
})

exports.delete = asyncHandler(async (req, res) => {
  const { id_course } = req.params
  const { id_user } = req.user
  await knex('favorites')
    .where({
      id_course,
      id_user
    })
    .update({
      deleted: true
    })

  res.json({id_course})
})
