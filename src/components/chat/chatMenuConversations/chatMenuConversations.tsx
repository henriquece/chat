import React from 'react'
import styled from 'styled-components'
import ChatMenuConversation from '../chatMenuConversation/chatMenuConversation'
import Conversation from '../../types'

const ChatMenuConversationsWrapper = styled.div``

interface ChatMenuConversationsProps {
  conversations: Conversation[]
}

const ChatMenuConversations: React.FC<ChatMenuConversationsProps> = ({
  conversations,
}) => (
  <ChatMenuConversationsWrapper>
    {conversations.map((conversation) => (
      <ChatMenuConversation
        contactName={conversation.contactName}
        lastMessageContent={conversation.lastMessage.content}
        lastMessageDate={conversation.lastMessage.date}
      />
    ))}
  </ChatMenuConversationsWrapper>
)

export default ChatMenuConversations
