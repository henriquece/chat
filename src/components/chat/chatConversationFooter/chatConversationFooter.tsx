import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import TextInput from '../../commons/textInput/textInput'
import SendArrowIcon from '../../../assets/icons/send-arrow.svg'
import FormElementWrapper from '../../commons/formElementWrapper/formElementWrapper'
import { message } from '../../../constants/formElementNames'
import Button from '../../commons/button/button'
import { addMessage, getConversation } from '../../../services/conversation'
import { Conversation } from '../../types'

const ChatConversationFooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${colors.navy.light};
`

const SendArrowIconStyled = styled(SendArrowIcon)`
  & > path {
    fill: ${colors.white};
  }
`

interface ChatConversationFooterProps {
  conversationSelectedId: string | null
  conversations: Conversation[]
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
}

const ChatConversationFooter: React.FC<ChatConversationFooterProps> = ({
  conversationSelectedId,
  conversations,
  setConversations,
}) => {
  const [formElementsValue, setFormElementsValue] = useState<{
    [message]: string
  }>({
    [message]: '',
  })

  const sendMessage = async () => {
    const messageContent = formElementsValue[message]

    if (messageContent && conversationSelectedId) {
      const date = new Date().getTime().toString()

      const messageResponse = await addMessage(
        conversationSelectedId,
        date,
        messageContent
      )

      if (messageResponse.success) {
        const conversationResponse = await getConversation(
          conversationSelectedId
        )

        if (conversationResponse.success) {
          const newConversation = conversationResponse.data

          const conversationIndex = conversations.findIndex(
            (conversation) => conversation.id === conversationSelectedId
          )

          const conversationsUpdated = [...conversations]

          conversationsUpdated.splice(conversationIndex, 1)

          conversationsUpdated.push(newConversation)

          setConversations(conversationsUpdated)
        }
      }
    }
  }

  return (
    <ChatConversationFooterWrapper>
      <FormElementWrapper flex="1" margin="0">
        <TextInput
          name={message}
          formElementsValue={formElementsValue}
          setFormElementsValue={setFormElementsValue}
          variant="clear"
          placeholder="Message"
        />
      </FormElementWrapper>
      <FormElementWrapper margin="0 10px">
        <Button onClick={sendMessage} variant="clear">
          <SendArrowIconStyled />
        </Button>
      </FormElementWrapper>
    </ChatConversationFooterWrapper>
  )
}

export default ChatConversationFooter
