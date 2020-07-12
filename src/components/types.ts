/* eslint-disable no-undef */

type UserId = string

type UserName = string

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

export {
  UserId,
  UserName,
  Message,
  Conversation,
  Conversations,
  SearchedContact,
}
