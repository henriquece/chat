import request, { ResponseInterceptor } from '../utils/request'
import { Conversation, Conversations } from '../types'

export const createConversationRequest = async (contactId: string) =>
  request.post<unknown, ResponseInterceptor<Conversation>>(
    `/conversation/create-conversation`,
    {
      contactId,
    }
  )

export const getConversationsRequest = async () =>
  request.get<unknown, ResponseInterceptor<Conversations>>(
    `/conversation/conversations`
  )

interface AddMessageRequestResponse {
  message: 'Message added'
}

export const addMessageRequest = async (
  conversationId: string,
  date: string,
  content: string
) =>
  request.post<unknown, ResponseInterceptor<AddMessageRequestResponse>>(
    `/conversation/${conversationId}`,
    { date, content }
  )
