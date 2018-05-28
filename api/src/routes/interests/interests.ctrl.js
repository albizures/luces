const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')

exports.getAllUserInterests = asyncHandler(async (req, res) => {
  const videos = await knex
    .select({
      id_: 'id',
      
    })
    .from('interests')

  res.json(videos)
})

exports.post = asyncHandler(async (req, res) => {
  const { categories } = req.body
  const { id_user } = req.user

  console.log(id_user)

  const promises = categories.map(category => knex('interests').insert({
    id_category: category,
    id_user: id_user
  }))

  await Promise.all(promises)

  res.json({ categories })
})
