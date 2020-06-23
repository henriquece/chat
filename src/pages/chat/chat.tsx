import React from 'react'
import styled from 'styled-components'
import PageWrapper from '../../components/commons/pageWrapper/pageWrapper'
import colors from '../../constants/colors'
import ChatMenuConversations from '../../components/chat/chatMenuConversations/chatMenuConversations'
import ChatConversationHeader from '../../components/chat/chatConversationHeader/chatConversationHeader'
import ChatConversationMessages from '../../components/chat/chatConversationMessages/chatConversationMessages'
import ChatConversationFooter from '../../components/chat/chatConversationFooter/chatConversationFooter'

const ChatWrapper = styled.div`
  display: flex;
  height: 100%;
`

const ChatMenu = styled.div`
  width: 410px;
  background: ${colors.navy.medium};
`

const ChatConversation = styled.div`
  flex: 1;
  background: ${colors.navy.dark};
`

const Chat: React.FC = () => {
  const conversations = [
    {
      contactName: 'João',
      lastMessage: {
        content: 'Oi. Tudo bem?',
        date: '20:49',
      },
    },
    {
      contactName: 'Flávio',
      lastMessage: {
        content: 'Beleza!',
        date: '20:49',
      },
    },
    {
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
        <ChatMenu>
          <ChatMenuConversations conversations={conversations} />
        </ChatMenu>
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
