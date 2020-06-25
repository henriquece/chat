/* eslint-disable no-undef */

interface UserInfo {
  name: string
}

interface Conversation {
  id: number
  contactName: string
  lastMessage: {
    content: string
    date: string
  }
}

export { UserInfo, Conversation }
