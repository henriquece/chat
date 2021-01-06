/* eslint-disable no-undef */

type UserId = string

type UserName = string

type ConversationSelectedId = string | null

interface Message {
  _id: string
  userId: string
  date: number
  content: string
}

interface Conversation {
  _id: string
  contactId: UserId
  contactName: UserName
  messages: Message[]
}

type Conversations = Conversation[]

interface SearchedContact {
  _id: UserId
  email: string
  name: UserName
}

interface ChatStoreInitialState {
  conversations: Conversations
  conversationSelectedId: ConversationSelectedId
}

export {
  UserId,
  UserName,
  ConversationSelectedId,
  Message,
  Conversation,
  Conversations,
  SearchedContact,
  ChatStoreInitialState,
}