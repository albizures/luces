import axios from 'axios'
import { PORT, HOST } from 'react-native-dotenv'

const base = axios.create({
  baseURL: `http://${HOST}:${PORT}/api`
})

console.log(process.env)
export default {
  get (url) {
    console.log(url, `http://${HOST}:${PORT}/api`)
    return base.get(url)
  },
  post (url, body) {
    return base.post(url, body)
  }
}
