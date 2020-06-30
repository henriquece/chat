import request from '../utils/request'

const getUsersRequest = async (name: string) => {
  try {
    const res = await request.get(`/user/${name}`)

    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, data: error.response.data.message }
  }
}

const o = '0'

export { getUsersRequest, o }
