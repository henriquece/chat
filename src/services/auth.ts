import request, { ResponseInterceptor } from '../utils/request'

interface SignupRequestResponse {
  userId: string
  userName: string
  message: 'User created' | 'email address already exists'
  token: string
}

export const signupRequest = async (
  email: string,
  name: string,
  password: string
) =>
  request.put<unknown, ResponseInterceptor<SignupRequestResponse>>(
    '/auth/signup',
    {
      email,
      name,
      password,
    }
  )

interface SigninRequestResponse {
  userId: string
  userName: string
  message: 'email incorrect' | 'password incorrect'
  token: string
}

export const signinRequest = async (email: string, password: string) =>
  request.post<unknown, ResponseInterceptor<SigninRequestResponse>>(
    '/auth/signin',
    {
      email,
      password,
    }
  )
