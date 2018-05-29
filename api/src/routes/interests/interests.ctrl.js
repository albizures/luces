const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')

exports.getAllUserInterests = asyncHandler(async (req, res) => {
  const categories = await knex('interests')
    .select({
      category: 'categories.id'
    })
    .join('categories', 'interests.id_category', 'categories.id')
    .join('users', 'interests.id_user', 'users.id_user')
    .whereNot({
      'interests.deleted': true,
      'categories.deleted': true,
      'users.deleted': true
    })

  res.json(categories)
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
