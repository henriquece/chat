import React from 'react'
import styled from 'styled-components'
import ChatPanelContact from '../chatPanelContact/chatPanelContact'
import { Conversation } from '../../types'

const ChatPanelContactsSearchWrapper = styled.div``

interface ChatPanelContactsSearchProps {
  conversations: Conversation[]
}

const ChatPanelContactsSearch: React.FC<ChatPanelContactsSearchProps> = ({
  conversations,
}) => (
  <ChatPanelContactsSearchWrapper>
    {conversations.map((conversation) => (
      <ChatPanelContact
        key={conversation.id}
        contactName={conversation.contactName}
        lastMessageContent={conversation.lastMessage.content}
        lastMessageDate={conversation.lastMessage.date}
      />
    ))}
  </ChatPanelContactsSearchWrapper>
)

export default ChatPanelContactsSearch
