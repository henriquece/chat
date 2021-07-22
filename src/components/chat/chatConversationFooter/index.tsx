import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import colors from '../../../constants/colors'
import TextInput from '../../commons/textInput'
import SendArrowIcon from '../../../assets/icons/send-arrow.svg'
import FormElementWrapper from '../../commons/formElementWrapper'
import { message } from '../../../constants/formElementNames'
import Button from '../../commons/button'
import { addMessageRequest } from '../../../services/conversation'
import { RootState } from '../../../store/reducers'

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

const ChatConversationFooter: React.FC = () => {
  const [conversationSelectedId] = useSelector((state: RootState) => [
    state.conversations.conversationSelectedId,
  ])

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
          alt={message}
          formElementsValue={formElementsValue}
          setFormElementsValue={setFormElementsValue}
          handleEnterKeyPress={sendMessage}
          variant="clear"
          placeholder="Message"
        />
      </FormElementWrapper>
      <FormElementWrapper margin="0 10px">
        <Button
          onClick={sendMessage}
          variant="clear"
          testid="send-message-button"
        >
          <SendArrowIconStyled />
        </Button>
      </FormElementWrapper>
    </ChatConversationFooterWrapper>
  )
}

export default ChatConversationFooter
