import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import openSocket from 'socket.io-client'
import { useHistory } from 'react-router-dom'
import PageWrapper from '../../components/commons/pageWrapper/pageWrapper'
import colors from '../../constants/colors'
import ChatPanelHeader from '../../components/chat/chatPanelHeader/chatPanelHeader'
import ChatPanelConversations from '../../components/chat/chatPanelConversations/chatPanelConversations'
import ChatPanelContactsSearch from '../../components/chat/chatPanelContactsSearch/chatPanelContactsSearch'
import ChatConversationHeader from '../../components/chat/chatConversationHeader/chatConversationHeader'
import ChatConversationMessages from '../../components/chat/chatConversationMessages/chatConversationMessages'
import ChatConversationFooter from '../../components/chat/chatConversationFooter/chatConversationFooter'
import {
  UserId,
  UserName,
  Conversation,
  Conversations,
} from '../../components/types'
import { getConversationsRequest } from '../../services/conversation'
import { serverURL } from '../../utils/request'
import PageContext from '../../contexts/pageContext'
import routesPath from '../../constants/routesPath'
import localStorageGet from '../../utils/localStorage'

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
`

type MobileComponentName = 'panel' | 'conversation'

let socket: SocketIOClient.Socket

const Chat: React.FC = () => {
  const { isMobile } = useContext(PageContext)

  const history = useHistory()

  const [mobileComponentName, setMobileComponentName] = useState<
    MobileComponentName
  >('panel')

  const [userId, setUserId] = useState<UserId>('')

  const [userName, setUserName] = useState<UserName>('')

  const [conversations, setConversations] = useState<Conversations>([])

  const [conversationSelectedId, setConversationSelectedId] = useState<
    string | null
  >(null)

  const [addContactMode, setAddContactMode] = useState<boolean>(false)

  const updateConversation = (newConversation: Conversation) => {
    const conversationIndex = conversations.findIndex(
      (conversation) => conversation._id === newConversation._id
    )

    let conversationsUpdated

    if (conversationIndex !== -1) {
      conversationsUpdated = conversations.map((conversation, index) => ({
        ...conversation,
        messages:
          index === conversationIndex
            ? newConversation.messages
            : [...conversation.messages],
      }))
    } else {
      conversationsUpdated = [...conversations]

      conversationsUpdated.push(newConversation)
    }

    setConversations(conversationsUpdated)
  }

  useEffect(() => {
    setUserId(localStorageGet('userId'))

    setUserName(localStorageGet('userName'))

    const fetchConversations = async () => {
      const { success, data } = await getConversationsRequest()

      if (success) {
        setConversations(data.conversations)
      } else {
        const error = data

        if (error === 'jwt malformed') {
          history.push(routesPath.home)
        }
      }
    }

    fetchConversations()

    socket = openSocket(serverURL)
  }, [])

  useEffect(() => {
    socket.off('message')

    socket.on('message', (socketData) => {
      updateConversation(socketData.conversation)
    })
  }, [conversationSelectedId])

  const conversationSelected = conversations.find(
    (conversation) => conversation._id === conversationSelectedId
  )

  const conversationSelectedMessages = conversationSelected
    ? conversationSelected.messages
    : []

  const conversationSelectedContactName = conversationSelected
    ? conversationSelected.contactName
    : ''

  const chatPanel = (
    <ChatPanel>
      <ChatPanelHeader
        userName={userName}
        addContactMode={addContactMode}
        toggleAddContactMode={() => {
          setAddContactMode((prevState) => !prevState)
        }}
      />
      {addContactMode ? (
        <ChatPanelContactsSearch
          updateConversation={updateConversation}
          disableAddContactMode={() => {
            setAddContactMode(false)
          }}
        />
      ) : (
        <ChatPanelConversations
          conversations={conversations}
          setConversationSelectedId={setConversationSelectedId}
          toggleToConversationOnMobile={() => {
            setMobileComponentName('conversation')
          }}
        />
      )}
    </ChatPanel>
  )

  const chatConversation = (
    <ChatConversation>
      {conversationSelectedId && (
        <ChatConversationHeader
          contactName={conversationSelectedContactName}
          toggleToPanelOnMobile={() => {
            setMobileComponentName('panel')
          }}
        />
      )}
      <ChatConversationMessages
        userId={userId}
        messages={conversationSelectedMessages}
      />
      {conversationSelectedId && (
        <ChatConversationFooter
          conversationSelectedId={conversationSelectedId}
        />
      )}
    </ChatConversation>
  )

  const mobileComponent =
    mobileComponentName === 'panel' ? chatPanel : chatConversation

  return (
    <PageWrapper backgroundColor={colors.navy.dark}>
      <ChatWrapper>
        {isMobile ? (
          mobileComponent
        ) : (
          <>
            {chatPanel}
            {chatConversation}
          </>
        )}
      </ChatWrapper>
    </PageWrapper>
  )
}

export default Chat
