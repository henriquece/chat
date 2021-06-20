import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import ChatPanelContact from '../chatPanelContact'
import { setConversationSelectedId } from '../../../store/actions'
import { RootState } from '../../../store/reducers'
import { getHours, getMinutes } from '../../../utils/date'

const ChatPanelConversationsWrapper = styled.div``

interface ChatPanelConversationsProps {
  toggleToConversationOnMobile: () => void
}

const ChatPanelConversations: React.FC<ChatPanelConversationsProps> = ({
  toggleToConversationOnMobile,
}) => {
  const userId = localStorage.getItem('userId')

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

          const lastMessageDateHour = getHours(lastMessageDateObject)

          const lastMessageDateMinutes = getMinutes(lastMessageDateObject)

          lastMessageContent = lastMessage.content

          lastMessageDate = `${lastMessageDateHour}:${lastMessageDateMinutes}`
        }

        const contactName =
          conversation?.users?.find((user) => user._id !== userId)?.name || ''

        return (
          <ChatPanelContact
            key={conversation._id}
            contactName={contactName}
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
