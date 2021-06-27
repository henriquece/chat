import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatConversationFooter from './index'
import { apiURL } from '../../../utils/request'
import { message } from '../../../constants/formElementNames'
import reducer, { RootState } from '../../../store/reducers'

const initialState: RootState = {
  user: {
    userId: '',
    userName: '',
  },
  conversations: {
    conversations: [],
    conversationSelectedId: '1',
    chatPanelMode: 'conversations',
  },
}

const store = createStore(reducer, initialState, applyMiddleware(thunk))

const server = setupServer(
  rest.post(`${apiURL}conversation/:conversationId`, (req, res, ctx) => {
    return res(ctx.json({ message: 'Message added' }))
  })
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('should empty message field after sending message', async () => {
  const messageContent = 'Olá'

  const { getByAltText } = render(
    <Provider store={store}>
      <ChatConversationFooter />
    </Provider>
  )

  userEvent.type(getByAltText(message), messageContent)

  await waitFor(() => userEvent.type(getByAltText(message), '{enter}'))

  const messageFormElement = await waitFor(() => screen.getByAltText(message))

  expect(messageFormElement.getAttribute('value')).toBe('')
})
