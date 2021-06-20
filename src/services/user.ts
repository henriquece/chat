import request, { ResponseInterceptor } from '../utils/request'

export interface User {
  _id: string
  email: string
  name: string
}

export const getUsersRequest = async (name: string) =>
  request.get<unknown, ResponseInterceptor<User[]>>(`/user/${name}`)
