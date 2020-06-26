import React from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import getInitialCapitalized from '../../../utils/string'
import ThreeDotsIcon from '../../../assets/icons/three-dots.svg'

const ChatConversationHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: ${colors.navy.light};
`

const ContactPicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.blue.medium};
  color: ${colors.text.white};
  font-weight: 700;
`

const ThreeDotsIconStyled = styled(ThreeDotsIcon)`
  & > path {
    fill: ${colors.white};
  }
`

interface ChatConversationHeaderProps {
  contactName: string
}

const ChatConversationHeader: React.FC<ChatConversationHeaderProps> = ({
  contactName,
}) => (
  <ChatConversationHeaderWrapper>
    <ContactPicture>{getInitialCapitalized(contactName)}</ContactPicture>
    <ThreeDotsIconStyled />
  </ChatConversationHeaderWrapper>
)

export default ChatConversationHeader
