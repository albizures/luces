const asyncHandler = require('express-async-handler')

const knex = require('../../config/connection')

exports.postLike = asyncHandler(async (req, res) => {
  const { id: id_comment } = req.params
  const { id_user } = req.user
  await knex('likes')
    .insert({
      id_comment,
      id_user
    })

  const [likes] = await knex('likes')
    .select({
      id: 'likes.id_comment',
      likes: knex.raw('COUNT(likes.id_comment)')
    })
    .where({
      'likes.deleted': false,
      'likes.id_comment': id_comment
    })
    .groupBy('likes.id_comment')

  res.json(likes)
})
