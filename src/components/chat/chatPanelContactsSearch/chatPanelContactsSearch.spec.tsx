import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatPanelContactsSearch from './index'
import { apiURL } from '../../../utils/request'
import { text } from '../../../constants/formElementNames'
import reducer, { RootState } from '../../../store/reducers'
import { User } from '../../../services/user'

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

test('should render contact name searched after typing her name', async () => {
  localStorage.setItem('userId', '1')

  const server = setupServer(
    rest.get(`${apiURL}user/:email`, (req, res, ctx) => {
      return res(
        ctx.json([{ _id: '3', name: 'Ana', email: 'ana@gmail.com' }] as User[])
      )
    })
  )

  server.listen()

  const { getByAltText } = render(
    <Provider store={store}>
      <ChatPanelContactsSearch disableAddContactMode={() => null} />
    </Provider>
  )

  userEvent.type(getByAltText(text), 'ana@gmail.com')

  await waitFor(() => screen.getByText('Ana'))

  server.close()
})

test('should render "No contacts found" after typing her name if she is already a contact', async () => {
  const server = setupServer(
    rest.get(`${apiURL}user/:email`, (req, res, ctx) => {
      return res(
        ctx.json([
          { _id: '2', name: 'Maria', email: 'maria@gmail.com' },
        ] as User[])
      )
    })
  )

  server.listen()

  const { getByAltText } = render(
    <Provider store={store}>
      <ChatPanelContactsSearch disableAddContactMode={() => null} />
    </Provider>
  )

  userEvent.type(getByAltText(text), 'maria@gmail.com')

  await waitFor(() => screen.getByText('No contacts found'))

  server.close()
})
