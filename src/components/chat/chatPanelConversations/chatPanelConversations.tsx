import React from 'react'
import styled from 'styled-components'
import ChatPanelContact from '../chatPanelContact/chatPanelContact'
import { Conversation } from '../../types'

const ChatPanelConversationsWrapper = styled.div``

interface ChatPanelConversationsProps {
  conversations: Conversation[]
}

const ChatPanelConversations: React.FC<ChatPanelConversationsProps> = ({
  conversations,
}) => (
  <ChatPanelConversationsWrapper>
    {conversations.map((conversation) => (
      <ChatPanelContact
        key={conversation.id}
        variant="conversation"
        contactName={conversation.contactName}
        lastMessageContent={conversation.lastMessage.content}
        lastMessageDate={conversation.lastMessage.date}
      />
    ))}
  </ChatPanelConversationsWrapper>
)

export default ChatPanelConversations
