const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')

exports.getAll = asyncHandler(async (req, res) => {
  const categories = await knex('categories')
    .select({
      id: 'id',
      name: 'name',
      icon: 'icon'
    })
    .whereNot({
      deleted: true
    })

  res.json(categories)
})

exports.getHighlights = asyncHandler(async (req, res) => {
  const { id } = req.params

  const courses = await knex('categories')
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
    .join('courses', 'courses.id_category', 'categories.id')
    .where({
      'categories.id': id,
      'courses.deleted': false,
      'categories.deleted': false
    })
    .limit(5)
    .orderBy('courses.created_at', 'desc')

  console.log('test', courses)
  res.json(courses)
})

exports.getSubcategories = asyncHandler(async (req, res) => {
  const { id } = req.params
  const subcategories = await knex('subcategories')
    .select({
      id: 'id',
      name: 'name'
    })
    .where({
      id_category: id,
      deleted: false
    })

  console.log('test', subcategories)
  res.json(subcategories)
})

exports.post = asyncHandler(async (req, res) => {
  const { name } = req.body

  const [id] = await knex('categories')
    .returning('id')
    .insert({
      name
    })

  res.json({ id })
})

exports.put = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  await knex('categories')
    .where({ id })
    .update({ name })

  res.json({ id })
})

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params
  await knex('categories')
    .where({ id })
    .update('deleted', true)

  res.json({ id })
})
