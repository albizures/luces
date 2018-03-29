const asyncHandler = require('express-async-handler')
const Promise = require('bluebird')

const knex = require('../../config/connection')

exports.getAll = asyncHandler(async (req, res) => {
  const courses = await knex('courses')
    .select({
      id: 'courses.id',
      name: 'courses.name',
      description: 'courses.description',
      image: 'courses.image_url',
      idCategory: 'categories.id',
      videos: knex.raw('COUNT(course_videos.id_course)')
    })
    .join('categories', 'courses.id_category', 'categories.id')
    .leftJoin('course_videos', 'courses.id', 'course_videos.id_course')
    .whereNot({
      'courses.deleted': true
    })
    .groupBy('courses.id')

  res.json(courses)
})

exports.getVideos = asyncHandler(async (req, res) => {
  const { id } = req.params
  const videos = await knex('course_videos')
    .select({
      id: 'videos.id',
      name: 'videos.name',
      youtubeId: 'videos.id_youtube',
      description: 'videos.description',
      url: 'videos.image_url'
    })
    .join('videos', 'course_videos.id_video', 'videos.id')
    .orderBy('course_videos.order', 'asc')
    .where({
      'course_videos.id_course': id
    })

  res.json(videos)
})

const createVideo = (course, trx) => async (data) => {
  const { name, description, id: id_youtube, image, order } = data
  const { url: image_url, download } = image

  if (download) {
    console.warn('I NEED TO DOWLOAD THE IMAGE!!!')
  }
  console.log(order, name)

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
      id_course: course,
      order
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

  res.json({ id: result })
})

exports.put = asyncHandler(async (req, res) => {
  const { id } = req.params
  const {
    name,
    category: id_category,
    description,
    image: image_url
  } = req.body

  await knex('courses')
    .where({ id })
    .update({
      name,
      id_category,
      description,
      image_url
    })

  res.json({ id })
})
exports.putVideos = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { videos } = req.body

  const videoCreator = createVideo(id, knex)

  const videoIds = await Promise.all(videos.map(videoCreator))

  res.json({ videos: videoIds })
})

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params
  await knex('courses')
    .where({ id })
    .update('deleted', true)

  res.json({ id })
})
