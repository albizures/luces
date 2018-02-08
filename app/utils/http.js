import axios from 'axios'

const base = 'http://localhost:3000/api/'

export default {
  get (url) {
    return axios.get(base + url)
  },
  post (url, body) {
    return axios.post(base + url, body)
  }
}