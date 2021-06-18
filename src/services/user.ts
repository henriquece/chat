import request from '../utils/request'

export interface User {
  _id: string
  email: string
  name: string
}

export const getUsersRequest = async (name: string) => {
  try {
    const res = await request.get(`/user/${name}`)

    return { success: true, data: res.data }
  } catch (error) {
    if (error.message === 'Network Error') {
      return { success: false, data: error.message }
    }
    return { success: false, data: error.response.data.message }
  }
}
