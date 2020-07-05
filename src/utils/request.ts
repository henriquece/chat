import axios from 'axios'

const baseURL = 'http://localhost:3000'

const request = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
})

export default request
