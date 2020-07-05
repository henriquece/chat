/* eslint-disable no-undef */

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
  id: string
  messages: Message[]
}

export { UserInfo, PanelConversation, Message, Conversation }
