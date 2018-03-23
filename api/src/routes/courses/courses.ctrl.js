const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')

exports.getAll = asyncHandler(async (req, res) => {
  const categories = await knex('courses')
    .join('categories', 'courses.id_category', 'categories.id')
    .select({
      id: 'courses.id',
      name: 'courses.name',
      description: 'courses.description',
      image: 'courses.image_url',
      idCategory: 'categories.id'
    })
    .whereNot({
      'courses.deleted': true
    })

  res.json(categories)
})

exports.post = asyncHandler(async (req, res) => {
  const {
    name,
    category: id_category,
    description,
    image: image_url
  } = req.body

  const [id] = await knex('courses')
    .returning('id')
    .insert({
      name,
      id_category,
      description,
      image_url
    })

  res.json({ id })
})

exports.put = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  await knex('courses')
    .where({ id })
    .update({ name })

  res.json({ id })
})

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params
  await knex('courses')
    .where({ id })
    .update('deleted', true)

  res.json({ id })
})
