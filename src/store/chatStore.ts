import { initStore } from './store'
import { ChatStoreInitialState } from '../types'

export const chatStoreActions = {
  SET_CONVERSATIONS: 'SET_CONVERSATIONS',
  UPDATE_CONVERSATIONS: 'UPDATE_CONVERSATIONS',
  SET_CONVERSATION_SELECTED_ID: 'SET_CONVERSATION_SELECTED_ID',
}

export const setConversations = (curState, conversations) => {
  return { conversations }
}

export const updateConversations = (currentState, newConversation) => {
  const conversationIndex = currentState.conversations.findIndex(
    (conversation) => conversation._id === newConversation._id
  )

  let conversationsUpdated

  if (conversationIndex !== -1) {
    conversationsUpdated = currentState.conversations.map(
      (conversation, index) => ({
        ...conversation,
        messages:
          index === conversationIndex
            ? newConversation.messages
            : [...conversation.messages],
      })
    )
  } else {
    conversationsUpdated = [...currentState.conversations]

    conversationsUpdated.push(newConversation)
  }

  return { conversations: conversationsUpdated }
}

export const setConversationSelectedId = (currentState, conversationId) => {
  return { conversationSelectedId: conversationId }
}

export default function configureStore() {
  const actions = {
    [chatStoreActions.SET_CONVERSATIONS]: setConversations,
    [chatStoreActions.UPDATE_CONVERSATIONS]: updateConversations,
    [chatStoreActions.SET_CONVERSATION_SELECTED_ID]: setConversationSelectedId,
  }

  const initialState: ChatStoreInitialState = {
    conversations: [],
    conversationSelectedId: null,
  }

  initStore(actions, initialState)
}
