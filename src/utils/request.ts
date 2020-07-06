import axios from 'axios'

const serverURL = 'http://localhost:3000'

const request = axios.create({
  baseURL: serverURL,
})

request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

  return config
})

export { request as default, serverURL }
