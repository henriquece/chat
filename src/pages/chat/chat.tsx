import React from 'react'
import styled from 'styled-components'
import PageWrapper from '../../components/commons/pageWrapper/pageWrapper'
import colors from '../../constants/colors'
import ChatPanelHeader from '../../components/chat/chatPanelHeader/chatPanelHeader'
import ChatPanelConversations from '../../components/chat/chatPanelConversations/chatPanelConversations'
import ChatConversationHeader from '../../components/chat/chatConversationHeader/chatConversationHeader'
import ChatConversationMessages from '../../components/chat/chatConversationMessages/chatConversationMessages'
import ChatConversationFooter from '../../components/chat/chatConversationFooter/chatConversationFooter'

const ChatWrapper = styled.div`
  display: flex;
  height: 100%;
`

const ChatPanel = styled.div`
  width: 410px;
  border-right: 1px solid ${colors.navy.dark};
  background: ${colors.navy.medium};
`

const ChatConversation = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${colors.navy.dark};
`

const Chat: React.FC = () => {
  const userInfo = {
    name: 'Roberto',
  }

  const conversations = [
    {
      id: 1,
      contactName: 'João',
      lastMessage: {
        content: 'Oi. Tudo bem?',
        date: '20:49',
      },
    },
    {
      id: 2,
      contactName: 'Flávio',
      lastMessage: {
        content: 'Beleza!',
        date: '20:49',
      },
    },
    {
      id: 3,
      contactName: 'Marcelo',
      lastMessage: {
        content: 'Tá certo',
        date: '20:49',
      },
    },
  ]

  return (
    <PageWrapper backgroundColor={colors.navy.darker}>
      <ChatWrapper>
        <ChatPanel>
          <ChatPanelHeader userInfo={userInfo} />
          <ChatPanelConversations conversations={conversations} />
        </ChatPanel>
        <ChatConversation>
          <ChatConversationHeader contactName={conversations[0].contactName} />
          <ChatConversationMessages />
          <ChatConversationFooter />
        </ChatConversation>
      </ChatWrapper>
    </PageWrapper>
  )
}

export default Chat
