import React from 'react'
import styled from 'styled-components'

const ChatConversationHeaderWrapper = styled.div``

interface ChatConversationHeaderProps {
  contactName: string
}

const ChatConversationHeader: React.FC<ChatConversationHeaderProps> = ({
  contactName,
}) => (
  <ChatConversationHeaderWrapper>{contactName}</ChatConversationHeaderWrapper>
)

export default ChatConversationHeader
