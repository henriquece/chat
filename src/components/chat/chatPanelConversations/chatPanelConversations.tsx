import React from 'react'
import styled from 'styled-components'
import ChatPanelContact from '../chatPanelContact/chatPanelContact'
import { PanelConversation, Conversation } from '../../types'
import { getConversation } from '../../../services/conversation'

const ChatPanelConversationsWrapper = styled.div``

interface ChatPanelConversationsProps {
  panelConversations: PanelConversation[]
  conversations: Conversation[]
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
  setConversationSelectedId: React.Dispatch<React.SetStateAction<string>>
}

const ChatPanelConversations: React.FC<ChatPanelConversationsProps> = ({
  panelConversations,
  conversations,
  setConversations,
  setConversationSelectedId,
}) => {
  const handleClickOnContact = async (conversationId: string) => {
    // if () {

    const response = await getConversation(conversationId)
    // }

    if (response.success) {
      const conversation = response.data

      const conversationsUpdated = [...conversations]

      conversationsUpdated.push(conversation)

      setConversations(conversationsUpdated)

      setConversationSelectedId(conversationId)
    }
  }

  return (
    <ChatPanelConversationsWrapper>
      {panelConversations.map((conversation) => (
        <ChatPanelContact
          key={conversation.id}
          variant="conversation"
          contactName={conversation.contactName}
          handleClick={() => {
            handleClickOnContact(conversation.id)
          }}
          lastMessageContent={conversation.lastMessage.content}
          lastMessageDate={conversation.lastMessage.date}
        />
      ))}
    </ChatPanelConversationsWrapper>
  )
}

export default ChatPanelConversations
