import axios from 'axios'

const createAPI = (route) => {
  const post = (data) => axios.post(route, data)

  const getAll = () => axios.get(route)

  const put = (id, data) => axios.put(route + id, data)

  const del = async (id) => {
    await axios.delete(route + id)
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

export default {
  categories,
  courses
}
