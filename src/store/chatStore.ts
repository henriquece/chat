import { initStore } from './store'
import { ChatStoreInitialState } from '../types'

const chatStoreActions = {
  SET_CONVERSATIONS: 'SET_CONVERSATIONS',
  UPDATE_CONVERSATIONS: 'UPDATE_CONVERSATIONS',
  SET_CONVERSATION_SELECTED_ID: 'SET_CONVERSATION_SELECTED_ID',
}

const setConversations = (curState, conversations) => {
  return { conversations }
}

const updateConversations = (currentState, newConversation) => {
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

const setConversationSelectedId = (currentState, conversationId) => {
  return { conversationSelectedId: conversationId }
}

const configureStore = () => {
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

export { configureStore as default, chatStoreActions }
