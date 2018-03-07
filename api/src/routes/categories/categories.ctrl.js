const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')

exports.getAll = asyncHandler(async (req, res) => {
  const categories = await knex
    .select({
      id: 'id',
      name: 'name'
    })
    .from('categories')

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

exports.put = (req, res) => {

}
