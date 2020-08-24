import React from 'react'
import styled from 'styled-components'
import ChatPanelContact from '../chatPanelContact'
import { useStore } from '../../../store/store'
import { chatStoreActions } from '../../../store/chatStore'

const ChatPanelConversationsWrapper = styled.div``

interface ChatPanelConversationsProps {
  toggleToConversationOnMobile: () => void
}

const ChatPanelConversations: React.FC<ChatPanelConversationsProps> = ({
  toggleToConversationOnMobile,
}) => {
  const [{ conversations, conversationSelectedId }, dispatch] = useStore()

  const handleClickOnContact = async (conversationId: string) => {
    dispatch(chatStoreActions.SET_CONVERSATION_SELECTED_ID, conversationId)

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
            contactSelected={conversationSelectedId === conversation._id}
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
