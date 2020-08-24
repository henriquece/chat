import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import openSocket from 'socket.io-client'
import { useHistory } from 'react-router-dom'
import PageWrapper from '../../components/commons/pageWrapper'
import colors from '../../constants/colors'
import ChatPanelHeader from '../../components/chat/chatPanelHeader'
import ChatPanelConversations from '../../components/chat/chatPanelConversations'
import ChatPanelContactsSearch from '../../components/chat/chatPanelContactsSearch'
import ChatConversationHeader from '../../components/chat/chatConversationHeader'
import ChatConversationMessages from '../../components/chat/chatConversationMessages'
import ChatConversationFooter from '../../components/chat/chatConversationFooter'
import { UserId, UserName } from '../../types'
import { getConversationsRequest } from '../../services/conversation'
import { apiURL } from '../../utils/request'
import PageContext from '../../contexts/pageContext'
import routesPath from '../../constants/routesPath'
import localStorageGet from '../../utils/localStorage'
import Loader from '../../components/commons/loading'
import { useStore } from '../../store/store'
import { chatStoreActions } from '../../store/chatStore'

const ChatWrapper = styled.div`
  display: flex;
  height: 100%;
`

const ChatPanel = styled.div`
  position: relative;
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

  const [{ conversations, conversationSelectedId }, dispatch] = useStore()

  const history = useHistory()

  const [mobileComponentName, setMobileComponentName] = useState<
    MobileComponentName
  >('panel')

  const [userId, setUserId] = useState<UserId>('')

  const [userName, setUserName] = useState<UserName>('')

  const [addContactMode, setAddContactMode] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)

    setUserId(localStorageGet('userId'))

    setUserName(localStorageGet('userName'))

    const fetchConversations = async () => {
      const { success, data } = await getConversationsRequest()

      if (success) {
        dispatch(chatStoreActions.SET_CONVERSATIONS, data.conversations)

        setLoading(false)
      } else {
        const error = data

        if (error === 'jwt malformed') {
          history.push(routesPath.home)
        }
      }
    }

    fetchConversations()

    if (apiURL) {
      socket = openSocket(apiURL)
    }
  }, [])

  useEffect(() => {
    socket.off('message')

    socket.on('message', (socketData) => {
      dispatch(chatStoreActions.UPDATE_CONVERSATIONS, socketData.conversation)
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
          userId={userId}
          disableAddContactMode={() => {
            setAddContactMode(false)
          }}
        />
      ) : (
        <ChatPanelConversations
          toggleToConversationOnMobile={() => {
            setMobileComponentName('conversation')
          }}
        />
      )}
      <Loader loading={loading} />
    </ChatPanel>
  )

  const chatConversation = (
    <ChatConversation>
      {conversationSelectedId && (
        <ChatConversationHeader
          contactName={conversationSelectedContactName}
          toggleToPanelOnMobile={() => {
            setMobileComponentName('panel')

            dispatch(chatStoreActions.SET_CONVERSATION_SELECTED_ID, null)
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
