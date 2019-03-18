import { PORT, HOST } from 'react-native-dotenv'

let baseURL = `http://${HOST}`
if (PORT) {
  baseURL += `:${PORT}`
}

console.log(PORT, HOST)

const isFullUrl = (url) => !url.startsWith('http')

export default (url = '') => {
  if (isFullUrl(url)) {
    return baseURL + '/' + url
  }
  return url
}
