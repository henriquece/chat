import axios, { AxiosResponse, AxiosInstance } from 'axios'

export type ResponseInterceptor<T> = {
  success: boolean
} & AxiosResponse<T>

export const apiURL = process.env.API_URL

const request = axios.create({
  baseURL: apiURL,
})

request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

  return config
})

request.interceptors.response.use(
  (response) => {
    return { ...response, success: true }
  },
  (error) => {
    return { ...error.response, success: false }
  }
)

export default request as AxiosInstance
