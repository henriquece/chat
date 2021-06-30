import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatPanelHeader from './index'
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
        messages: [],
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

test('should render user name', async () => {
  localStorage.setItem('userName', 'João')

  const { getByText } = render(
    <Provider store={store}>
      <ChatPanelHeader
        addContactMode={false}
        toggleAddContactMode={() => null}
        closeSocket={() => null}
      />
    </Provider>
  )

  getByText('J')
})

test('should fire toggleAddContactMode when clicking on addContactMode button', async () => {
  const toggleAddContactMode = jest.fn()

  render(
    <Provider store={store}>
      <ChatPanelHeader
        addContactMode={false}
        toggleAddContactMode={toggleAddContactMode}
        closeSocket={() => null}
      />
    </Provider>
  )

  userEvent.click(screen.getByTestId('add-contact-mode-button'))

  expect(toggleAddContactMode).toHaveBeenCalledTimes(1)
})
