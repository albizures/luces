import axios from 'axios'
import isRequired from 'is-required'

const PORT = process.env.PORT
const HOST = process.env.HOST

const api = axios.create({
  baseURL: `http://${HOST}:${PORT}/api`
})

const createAPI = (route) => {
  const post = (data = isRequired('data')) => api.post(route, data)

  const getAll = () => api.get(route)

  const put = (id = isRequired('id'), data = isRequired('data')) => api.put(route + encodeURIComponent(id), data)

  const del = async (id = isRequired('id')) => {
    await api.delete(route + encodeURIComponent(id))
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
export const courses = createAPI('/courses/')
export const images = {
  del (url) {
    return api.delete('/images/' + encodeURIComponent(url))
  }
}

export const youtube = {
  getData (videoId = isRequired('videoId')) {
    return api.get('/videos/youtube/data/' + encodeURIComponent(videoId))
  }
}

export default {
  youtube,
  categories,
  courses,
  images
}
