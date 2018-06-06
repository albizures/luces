import { PORT, HOST } from 'react-native-dotenv'

let baseURL = `http://${HOST}`
if (PORT) {
  baseURL += `:${PORT}`
}

export default (url = '') => baseURL + '/' + url
