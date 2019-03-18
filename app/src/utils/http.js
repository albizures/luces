import axios from 'axios'
import createUrl from './createUrl'

const baseURL = createUrl('api')

export const instance = axios.create({ baseURL })

export default {
  get (url) {
    return instance.get(url)
  },
  del (url) {
    return instance.delete(url)
  },
  post (url, body) {
    return instance.post(url, body)
  },
  postWithFile (url, body) {
    return fetch(baseURL + '/' + url, {
      headers: {
        ...instance.defaults.headers.common,
        'Content-Type': 'multipart/form-data',
      },
      method: 'post',
      body,
    })
      .then(response => response.json())
      .then(response => ({
        data: response,
      }))
    // return instance({
    //   url,
    //   data,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   method: 'post',
    // })
  },
  put (url, body) {
    return instance.put(url, body)
  },
  login (token) {
    return instance.post('login', { token })
  },
}
