/* eslint-disable no-undef */

type UserId = string | null

interface UserInfo {
  name: string
}

interface UserInfo {
  name: string
}

interface PanelConversation {
  id: string
  contactName: string
  lastMessage: {
    content: string
    date: number
  }
}

interface Message {
  _id: string
  userId: string
  date: number
  content: string
}

interface Conversation {
  _id: string
  messages: Message[]
}

export { UserId, UserInfo, PanelConversation, Message, Conversation }
