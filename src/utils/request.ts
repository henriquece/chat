import axios from 'axios'

const apiURL = process.env.API_URL

const request = axios.create({
  baseURL: apiURL,
})

request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

  return config
})

export { request as default, apiURL }
