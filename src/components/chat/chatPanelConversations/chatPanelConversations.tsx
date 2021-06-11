import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import ChatPanelContact from '../chatPanelContact'
import { setConversationSelectedId } from '../../../store/actions'
import { RootState } from '../../../store/reducers'

const ChatPanelConversationsWrapper = styled.div``

interface ChatPanelConversationsProps {
  toggleToConversationOnMobile: () => void
}

const ChatPanelConversations: React.FC<ChatPanelConversationsProps> = ({
  toggleToConversationOnMobile,
}) => {
  const [
    conversations,
    conversationSelectedId,
  ] = useSelector((state: RootState) => [
    state.conversations.conversations,
    state.conversations.conversationSelectedId,
  ])

  const dispatch = useDispatch()

  const handleClickOnContact = async (conversationId: string) => {
    dispatch(setConversationSelectedId(conversationId))

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
