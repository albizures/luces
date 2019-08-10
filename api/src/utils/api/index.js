import axios from 'axios'

function isRequired (paramName) {
  let msg = 'Undefined or missing parameter'
  msg += paramName ? ` "${paramName}"` : ''
  throw new Error(msg)
}

const PORT = process.env.PORT
const HOST = process.env.HOST

let api = axios.create({
  baseURL: PORT ? `http://${HOST}:${PORT}/api` : `http://${HOST}/api`
})

let serverInstace = axios.create({
  baseURL: PORT ? `http://127.0.0.1:${PORT}/api` : `http://127.0.0.1/api`
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

export const categories = {
  ...createAPI('/categories/'),
  getSubcategories: (category) => api.get(`/categories/${category}/subcategories`)
}
export const courses = {
  ...createAPI('/courses/'),
  getVideos: (id = isRequired('id')) => api.get(`/courses/${encode(id)}/videos`),
  getSubcategories: (id = isRequired('id')) => api.get(`/courses/${encode(id)}/subcategories`),
  putVideos: (id = isRequired('id'), data = isRequired('data')) => api.put(`/courses/${encode(id)}/videos`, data),
  putSubcategories: (id = isRequired('id'), data = isRequired('data')) => api.put(`/courses/${encode(id)}/subcategories`, data),
  putVideosOrder: (id = isRequired('id'), data = isRequired('videos')) => api.put(`/courses/${encode(id)}/videos/order`, data),
  removeVideo: (
    courseId = isRequired('courseId'),
    videoId = isRequired('videoId')
  ) => api.delete(`/courses/${encode(courseId)}/videos/${encode(videoId)}`),
  search: (search = isRequired('search')) => api.get(`/courses/search/${encode(search)}`)
}

export const images = {
  del (url) {
    return api.delete(`/images/${encode(url)}`)
  }
}

export const videos = {
  put: (id = isRequired('id'), data = isRequired('data')) => api.put(`/videos/${encode(id)}`, data)
}

export const youtube = {
  getData (videoId = isRequired('videoId')) {
    return api.get(`/videos/youtube/data/${encode(videoId)}`)
  }
}

export const login = (email, password) => {
  return api.post('/login/password', { email, password })
}

export const server = (req) => {
  if (req && req.cookies) {
    api = serverInstace
    api.defaults.headers.common['Authorization'] = 'Bearer ' + req.cookies.id_token
  }
}

export const notifications = {
  send: (data = isRequired('data')) => api.post(`/notifications/send`, data)
}

export default {
  server,
  login,
  youtube,
  categories,
  courses,
  images,
  videos,
  notifications
}
