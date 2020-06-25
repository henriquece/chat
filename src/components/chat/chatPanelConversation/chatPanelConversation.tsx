import React from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import getInitialCapitalized from '../../../utils/string'

const ChatPanelConversationWrapper = styled.div`
  display: flex;
`

const PictureWrapper = styled.div`
  width: 66px;
  padding: 10px 0px 10px 16px;
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

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  padding: 10px 16px 10px 0px;
  border-bottom: 1px solid ${colors.navy.dark};
`

const ContactNameAndDateWrapper = styled.div`
  display: flex;
`

const ContactName = styled.div`
  flex: 1;
  color: ${colors.text.white};
  font-size: 16px;
  font-weight: 700;
`

const LastMessageDate = styled.div`
  width: 44px;
  color: ${colors.text.lightBlue};
  font-size: 12px;
`

const LastMessageContentAndNotification = styled.div`
  display: flex;
`

const LastMessageContent = styled.div`
  flex: 1;
  color: ${colors.text.lightBlue};
  font-size: 14px;
`

const Notification = styled.div`
  width: 32px;
`

interface ChatPanelConversationProps {
  contactName: string
  lastMessageContent: string
  lastMessageDate: string
}

const ChatPanelConversation: React.FC<ChatPanelConversationProps> = ({
  contactName,
  lastMessageContent,
  lastMessageDate,
}) => (
  <ChatPanelConversationWrapper>
    <PictureWrapper>
      <Picture>{getInitialCapitalized(contactName)}</Picture>
    </PictureWrapper>
    <InfoWrapper>
      <ContactNameAndDateWrapper>
        <ContactName>{contactName}</ContactName>
        <LastMessageDate>{lastMessageDate}</LastMessageDate>
      </ContactNameAndDateWrapper>
      <LastMessageContentAndNotification>
        <LastMessageContent>{lastMessageContent}</LastMessageContent>
        <Notification />
      </LastMessageContentAndNotification>
    </InfoWrapper>
  </ChatPanelConversationWrapper>
)

export default ChatPanelConversation
