import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import TextInput from '../../commons/textInput/textInput'
import SendArrowIcon from '../../../assets/icons/send-arrow.svg'
import FormElementWrapper from '../../commons/formElementWrapper/formElementWrapper'
import { message } from '../../../constants/formElementNames'

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
  const [formElementsValue, setFormElementsValue] = useState<{
    [message]: string
  }>({
    [message]: '',
  })

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
        <SendArrowIconStyled />
      </FormElementWrapper>
    </ChatConversationFooterWrapper>
  )
}

export default ChatConversationFooter