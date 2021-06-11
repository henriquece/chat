import { ConversationsActions } from '../actions'
import {
  Conversations,
  ConversationSelectedId,
  ChatPanelMode,
} from '../../types'

export interface ConversationsState {
  conversations: Conversations
  conversationSelectedId: ConversationSelectedId
  chatPanelMode: ChatPanelMode
}

const initialState: ConversationsState = {
  conversations: [],
  conversationSelectedId: null,
  chatPanelMode: 'conversations',
}

export default (state = initialState, action: ConversationsActions) => {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.conversations,
      }
    case 'SET_CONVERSATION_SELECTED_ID':
      return {
        ...state,
        conversationSelectedId: action.conversationSelectedId,
      }
    default:
      return state
  }
}
