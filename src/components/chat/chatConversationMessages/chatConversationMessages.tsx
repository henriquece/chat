import React from 'react'
import styled from 'styled-components'

const ChatConversationMessagesWrapper = styled.div`
  flex: 1;
`

interface ChatConversationMessagesProps {}

const ChatConversationMessages: React.FC<ChatConversationMessagesProps> = () => (
  <ChatConversationMessagesWrapper />
)

export default ChatConversationMessages
