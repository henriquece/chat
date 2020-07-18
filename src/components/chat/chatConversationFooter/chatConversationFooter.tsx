import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import TextInput from '../../commons/textInput/textInput'
import SendArrowIcon from '../../../assets/icons/send-arrow.svg'
import FormElementWrapper from '../../commons/formElementWrapper'
import { message } from '../../../constants/formElementNames'
import Button from '../../commons/button'
import { addMessageRequest } from '../../../services/conversation'
import { ConversationSelectedId } from '../../types'

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
  conversationSelectedId: ConversationSelectedId
}

const ChatConversationFooter: React.FC<ChatConversationFooterProps> = ({
  conversationSelectedId,
}) => {
  const defaultFormElementsValue = {
    [message]: '',
  }

  const [formElementsValue, setFormElementsValue] = useState<{
    [message]: string
  }>({
    [message]: defaultFormElementsValue[message],
  })

  const sendMessage = async () => {
    const messageContent = formElementsValue[message]

    if (messageContent && conversationSelectedId) {
      const date = new Date().getTime().toString()

      const messageResponse = await addMessageRequest(
        conversationSelectedId,
        date,
        messageContent
      )

      if (messageResponse.success) {
        setFormElementsValue({
          [message]: defaultFormElementsValue[message],
        })
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
          handleEnterKeyPress={sendMessage}
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
