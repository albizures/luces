const asyncHandler = require('express-async-handler')
const axios = require('axios')

const knex = require('../../config/connection')

exports.getAll = asyncHandler(async (req, res) => {
  const videos = await knex
    .select({
      id: 'id',
      name: 'name',
      description: 'description',
      youtubeID: 'id_youtube'
    })
    .from('videos')

  res.json(videos)
})

exports.post = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    youtubeID
  } = req.body

  const [id] = await knex('videos')
    .returning('id')
    .insert({
      name,
      description,
      'id_youtube': youtubeID
    })

  res.json({ id })
})

exports.put = (req, res) => {

}

const getYoutubeDataUrl = (id) => `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`

exports.getYoutubeData = asyncHandler(async (req, res) => {
  const { id } = req.params
  const response = await axios.get(getYoutubeDataUrl(id))
  console.log(response.data)
  res.json(response.data)
})
