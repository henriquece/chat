interface Conversation {
  contactName: string
  lastMessage: {
    content: string
    date: string
  }
}

export default Conversation
