import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import openSocket from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import PageWrapper from '../../components/commons/pageWrapper'
import colors from '../../constants/colors'
import ChatPanelHeader from '../../components/chat/chatPanelHeader'
import ChatPanelConversations from '../../components/chat/chatPanelConversations'
import ChatPanelContactsSearch from '../../components/chat/chatPanelContactsSearch'
import ChatConversationHeader from '../../components/chat/chatConversationHeader'
import ChatConversationMessages from '../../components/chat/chatConversationMessages'
import ChatConversationFooter from '../../components/chat/chatConversationFooter'
import { apiURL } from '../../utils/request'
import PageContext from '../../contexts/pageContext'
import { RootState } from '../../store/reducers'
import {
  fetchConversations,
  setConversationSelectedId,
  setConversations,
} from '../../store/actions'
import { updateConversations } from '../../utils/conversations'

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

  const userId = localStorage.getItem('userId')

  const [
    conversations,
    conversationSelectedId,
  ] = useSelector((state: RootState) => [
    state.conversations.conversations,
    state.conversations.conversationSelectedId,
  ])

  const dispatch = useDispatch()

  const [mobileComponentName, setMobileComponentName] = useState<
    MobileComponentName
  >('panel')

  const [addContactMode, setAddContactMode] = useState<boolean>(false)

  useEffect(() => {
    const callFetchConversations = () => {
      dispatch(fetchConversations())
    }

    callFetchConversations()

    if (apiURL) {
      socket = openSocket(apiURL, {
        query: {
          userId,
        },
      })
    }
  }, [])

  useEffect(() => {
    socket.off('message')

    socket.on('message', (socketData) => {
      const updatedConversations = updateConversations(
        conversations,
        socketData.conversation
      )

      dispatch(setConversations(updatedConversations))
    })
  }, [conversationSelectedId])

  const conversationSelected = conversations.find(
    (conversation) => conversation._id === conversationSelectedId
  )

  const conversationSelectedMessages = conversationSelected
    ? conversationSelected.messages
    : []

  const conversationSelectedContactName = conversationSelected
    ? conversationSelected.users.find((user) => user._id !== userId).name
    : ''

  const chatPanel = (
    <ChatPanel>
      <ChatPanelHeader
        addContactMode={addContactMode}
        toggleAddContactMode={() => {
          setAddContactMode((prevState) => !prevState)
        }}
      />
      {addContactMode ? (
        <ChatPanelContactsSearch
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
    </ChatPanel>
  )

  const chatConversation = (
    <ChatConversation>
      {conversationSelectedId && (
        <ChatConversationHeader
          contactName={conversationSelectedContactName}
          toggleToPanelOnMobile={() => {
            setMobileComponentName('panel')

            dispatch(setConversationSelectedId(null))
          }}
        />
      )}
      <ChatConversationMessages messages={conversationSelectedMessages} />
      {conversationSelectedId && <ChatConversationFooter />}
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
