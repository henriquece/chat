import { Conversations, ConversationSelectedId } from '../../types'
import { getConversationsRequest } from '../../services/conversation'
import { Dispatch } from 'redux'

export interface SetConversationsAction {
  type: 'SET_CONVERSATIONS'
  conversations: Conversations
}

export interface SetConversationSelectedIdAction {
  type: 'SET_CONVERSATION_SELECTED_ID'
  conversationSelectedId: ConversationSelectedId
}

export type ConversationsActions =
  | SetConversationsAction
  | SetConversationSelectedIdAction

export const setConversations = (
  conversations: Conversations
): SetConversationsAction => {
  return {
    type: 'SET_CONVERSATIONS',
    conversations,
  }
}

export const setConversationSelectedId = (
  conversationId: ConversationSelectedId
): SetConversationSelectedIdAction => {
  return {
    type: 'SET_CONVERSATION_SELECTED_ID',
    conversationSelectedId: conversationId,
  }
}

export const fetchConversations = () => {
  return async (dispatch: Dispatch) => {
    const response = await getConversationsRequest()

    if (response.success) {
      const {
        data: { conversations },
      } = response

      dispatch(setConversations(conversations))
    }
  }
}
