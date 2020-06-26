import React from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import TextInput from '../../commons/textInput/textInput'
import SendArrowIcon from '../../../assets/icons/send-arrow.svg'
import FormElementWrapper from '../../commons/formElementWrapper/formElementWrapper'

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

const ChatConversationFooter: React.FC = () => (
  <ChatConversationFooterWrapper>
    <FormElementWrapper flex="1" margin="0">
      <TextInput value="" variant="clear" placeholder="Mensagem" />
    </FormElementWrapper>
    <FormElementWrapper margin="0 10px">
      <SendArrowIconStyled />
    </FormElementWrapper>
  </ChatConversationFooterWrapper>
)

export default ChatConversationFooter
