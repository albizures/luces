import axios from 'axios'
import createUrl from './createUrl'

export const instance = axios.create({
  baseURL: createUrl('api')
})

console.log(createUrl('api'))
console.log(createUrl('api'))
console.log(createUrl('api'))
console.log(createUrl('api'))

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
  put (url, body) {
    return instance.put(url, body)
  },
  login (token) {
    return instance.post('login', { token })
  }
}
