import axios from 'axios'
import isRequired from 'is-required'

const PORT = process.env.PORT
const HOST = process.env.HOST

const api = axios.create({
  baseURL: `http://${HOST}:${PORT}/api`
})

const encode = encodeURIComponent

const createAPI = (route) => {
  const post = (data = isRequired('data')) => api.post(route, data)

  const getAll = () => api.get(route)

  const put = (id = isRequired('id'), data = isRequired('data')) => api.put(route + encode(id), data)

  const del = async (id = isRequired('id')) => {
    await api.delete(route + encode(id))
    return id
  }

  return {
    post,
    getAll,
    put,
    del
  }
}

export const categories = createAPI('/categories/')
export const courses = {
  ...createAPI('/courses/'),
  getVideos: (id = isRequired('id')) => api.get(`/courses/${encode(id)}/videos`),
  putVideos: (id = isRequired('id'), data = isRequired('data')) => api.put(`/courses/${encode(id)}/videos`, data),
  putVideosOrder: (id = isRequired('id'), data = isRequired('videos')) => api.put(`/courses/${encode(id)}/videos/order`, data),
  removeVideo: (
    courseId = isRequired('courseId'),
    videoId = isRequired('videoId')
  ) => api.delete(`/courses/${encode(courseId)}/videos/${encode(videoId)}`)
}

export const images = {
  del (url) {
    return api.delete(`/images/${encode(url)}`)
  }
}

export const youtube = {
  getData (videoId = isRequired('videoId')) {
    return api.get(`/videos/youtube/data/${encode(videoId)}`)
  }
}

export default {
  youtube,
  categories,
  courses,
  images
}
