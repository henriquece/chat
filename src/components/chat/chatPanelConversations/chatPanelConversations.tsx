import React from 'react'
import styled from 'styled-components'
import ChatPanelConversation from '../chatPanelConversation/chatPanelConversation'
import { Conversation } from '../../types'

const ChatMenuConversationsWrapper = styled.div``

interface ChatPanelConversationsProps {
  conversations: Conversation[]
}

const ChatPanelConversations: React.FC<ChatPanelConversationsProps> = ({
  conversations,
}) => (
  <ChatMenuConversationsWrapper>
    {conversations.map((conversation) => (
      <ChatPanelConversation
        key={conversation.id}
        contactName={conversation.contactName}
        lastMessageContent={conversation.lastMessage.content}
        lastMessageDate={conversation.lastMessage.date}
      />
    ))}
  </ChatMenuConversationsWrapper>
)

export default ChatPanelConversations
