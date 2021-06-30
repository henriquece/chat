import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { render } from '@testing-library/react'
import ChatPanelConversations from './index'
import reducer, { RootState } from '../../../store/reducers'

const initialState: RootState = {
  user: {
    userId: '1',
    userName: 'João',
  },
  conversations: {
    conversations: [
      {
        _id: '1',
        messages: [
          { _id: '1', content: 'Oi', date: 1624928415150, userId: '1' },
        ],
        users: [
          { _id: '1', name: 'João' },
          { _id: '2', name: 'Maria' },
        ],
      },
    ],
    conversationSelectedId: '1',
    chatPanelMode: 'conversations',
  },
}

const store = createStore(reducer, initialState, applyMiddleware(thunk))

test('should render contact name, last message content and last message date', async () => {
  localStorage.setItem('userId', '1')

  const { getByText } = render(
    <Provider store={store}>
      <ChatPanelConversations toggleToConversationOnMobile={() => null} />
    </Provider>
  )

  getByText('Maria')

  getByText('Oi')

  getByText('22:00')
})
