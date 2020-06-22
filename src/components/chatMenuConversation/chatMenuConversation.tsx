import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import { getInitialCapitalized } from '../../utils/string'

const ChatMenuConversationWrapper = styled.div`
  display: flex;
  padding: 10px 16px;
`

const PictureWrapper = styled.div`
  width: 66px;
`

const Picture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${colors.green.medium};
  color: ${colors.text.white};
  font-weight: 700;
`

const CenterWrapper = styled.div`
  flex: 1;
  background: ${colors.blue.medium};
`

const RightWrapper = styled.div`
  width: 44px;
  background: ${colors.green.medium};
`

interface ChatMenuConversationProps {
  contactName: string
  lastMessageContent: string
  lastMessageDate: string
}

const ChatMenuConversation: React.FC<ChatMenuConversationProps> = ({
  contactName,
  lastMessageContent,
  lastMessageDate,
}) => (
  <ChatMenuConversationWrapper>
    <PictureWrapper>
      <Picture>{getInitialCapitalized(contactName)}</Picture>
    </PictureWrapper>
    <CenterWrapper />
    <RightWrapper />
  </ChatMenuConversationWrapper>
)

export default ChatMenuConversation
