import React from 'react'
import styled from 'styled-components'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import colors from '../../constants/colors'
import ChatMenuConversation from '../../components/chatMenuConversation/chatMenuConversation'

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
          {conversations.map((conversation) => (
            <ChatMenuConversation
              contactName={conversation.contactName}
              lastMessageContent={conversation.lastMessage.content}
              lastMessageDate={conversation.lastMessage.date}
            />
          ))}
        </ChatMenu>
        <ChatConversation>s</ChatConversation>
      </ChatWrapper>
    </PageWrapper>
  )
}

export default Chat
