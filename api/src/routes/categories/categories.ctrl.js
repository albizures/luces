const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')

exports.getAll = asyncHandler(async (req, res) => {
  const categories = await knex('categories')
    .select({
      id: 'id',
      name: 'name'
    })
    .whereNot({
      deleted: true
    })

  res.json(categories)
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
