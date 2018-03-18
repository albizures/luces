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

  const put = (id = isRequired('id'), data = isRequired('data')) => api.put(route + id, data)

  const del = async (id = isRequired('id')) => {
    await api.delete(route + id)
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

export const youtube = {
  getData (videoId = isRequired('videoId')) {
    return api.get('/videos/youtube/data/' + videoId)
  }
}

export default {
  youtube,
  categories,
  courses
}
