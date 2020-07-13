import React from 'react'
import styled from 'styled-components'
import ChatPanelContact from '../chatPanelContact'
import { Conversation } from '../../types'

const ChatPanelConversationsWrapper = styled.div``

interface ChatPanelConversationsProps {
  conversations: Conversation[]
  setConversationSelectedId: React.Dispatch<React.SetStateAction<string>>
  toggleToConversationOnMobile: () => void
}

const ChatPanelConversations: React.FC<ChatPanelConversationsProps> = ({
  conversations,
  setConversationSelectedId,
  toggleToConversationOnMobile,
}) => {
  const handleClickOnContact = async (conversationId: string) => {
    setConversationSelectedId(conversationId)

    toggleToConversationOnMobile()
  }

  return (
    <ChatPanelConversationsWrapper>
      {conversations.map((conversation) => {
        let lastMessageContent
        let lastMessageDate

        const lastMessage =
          conversation.messages[conversation.messages.length - 1]

        if (lastMessage) {
          const lastMessageDateObject = new Date(lastMessage.date)

          const lastMessageDateHour = lastMessageDateObject.getHours()

          const lastMessageDateMinutes = lastMessageDateObject.getMinutes()

          lastMessageContent = lastMessage.content

          lastMessageDate = `${lastMessageDateHour}:${lastMessageDateMinutes}`
        }

        return (
          <ChatPanelContact
            key={conversation._id}
            contactName={conversation.contactName}
            lastMessageDate={lastMessageDate}
            lastMessageContent={lastMessageContent}
            handleClick={() => {
              handleClickOnContact(conversation._id)
            }}
          />
        )
      })}
    </ChatPanelConversationsWrapper>
  )
}

export default ChatPanelConversations
