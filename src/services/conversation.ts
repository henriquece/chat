import request from '../utils/request'

const createConversationRequest = async (contactId: string) => {
  const data = { contactId }

  try {
    const res = await request.post(`/conversation/create-conversation`, data)

    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, data: error.response.data.message }
  }
}

const getConversations = async () => {
  try {
    const res = await request.get(`/conversation/conversations`)

    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, data: error.response.data.message }
  }
}

const getConversation = async (conversationId: string) => {
  try {
    const res = await request.get(`/conversation/${conversationId}`)

    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, data: error.response.data.message }
  }
}

const addMessage = async (
  conversationId: string,
  date: string,
  content: string
) => {
  const data = { date, content }

  try {
    const res = await request.post(`/conversation/${conversationId}`, data)

    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, data: error.response.data.message }
  }
}

export {
  createConversationRequest,
  getConversations,
  getConversation,
  addMessage,
}
