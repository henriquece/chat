import request from '../utils/request'

const signupRequest = async (email: string, password: string) => {
  const data = {
    email,
    password,
  }

  try {
    const res = await request.put('/auth/signup', data)

    return { success: true, data: res }
  } catch (error) {
    return { success: false, data: error.response.data.message }
  }
}

const d = 'd'

export { signupRequest, d }
