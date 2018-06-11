import { PORT, HOST } from 'react-native-dotenv'

let baseURL = `http://${HOST}`
if (PORT) {
  baseURL += `:${PORT}`
}

const isRelative = (url) => !url.startsWith('http')

export default (url = '') => {
  if (isRelative(url)) {
    return baseURL + '/' + url
  }
  return url
}
