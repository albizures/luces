import axios from 'axios'
import { PORT, HOST } from 'react-native-dotenv'

export const instance = axios.create({
  baseURL: `http://${HOST}:${PORT}/api`
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
