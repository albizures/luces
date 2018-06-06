import axios from 'axios'
import createUrl from './createUrl'

export const instance = axios.create({
  baseURL: createUrl('api')
})

export default {
  get (url) {
    return instance.get(url)
  },
  post (url, body) {
    return instance.post(url, body)
  },
  login (token) {
    return instance.post('login', { token })
  }
}
