const asyncHandler = require('express-async-handler')
const Promise = require('bluebird')

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

const createVideo = (course, trx) => async (data) => {
  const { name, description, id: id_youtube, image } = data
  const { url: image_url, download } = image

  if (download) {
    console.log('I NEED TO DOWLOAD THE IMAGE!!!')
  }

  const [videoId] = await trx('videos')
    .returning('id')
    .insert({
      name,
      id_youtube,
      description,
      image_url
    })

  await trx('course_videos')
    .insert({
      id_video: videoId,
      id_course: course
    })
  return videoId
}

const beginTransaction = (body) => async (trx) => {
  const {
    name,
    category: id_category,
    description,
    image: image_url,
    videos
  } = body

  const [courseId] = await trx('courses')
    .returning('id')
    .insert({
      name,
      id_category,
      description,
      image_url
    })

  const videoCreator = createVideo(courseId, trx)

  await Promise.all(videos.map(videoCreator))
  return courseId
}

exports.post = asyncHandler(async (req, res) => {
  const result = await knex.transaction(beginTransaction(req.body))

  console.log(result)

  res.json({ id: result })
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
