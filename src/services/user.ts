import request, { ResponseInterceptor } from '../utils/request'

export interface User {
  _id: string
  email: string
  name: string
}

export const getUsersRequest = async (email: string) =>
  request.get<unknown, ResponseInterceptor<User[]>>(`/user/${email}`)
