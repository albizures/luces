import axios from 'axios'

const PORT = process.env.PORT
const HOST = process.env.HOST

axios.defaults.baseURL = `http://${HOST}:${PORT}`
