import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatPanelContact from './index'

test('should render lastMessageContent and lastMessageDate', () => {
  const lastMessageContent = 'Olá'
  const lastMessageDate = '20:50'

  const { getByText } = render(
    <ChatPanelContact
      contactName="João"
      lastMessageContent={lastMessageContent}
      lastMessageDate={lastMessageDate}
      handleClick={() => null}
    />
  )

  getByText(lastMessageContent)

  getByText(lastMessageDate)
})

test('should fire handleClick', () => {
  const handleClick = jest.fn()

  const { getByTestId } = render(
    <ChatPanelContact contactName="João" handleClick={handleClick} />
  )

  userEvent.click(getByTestId('chat-panel-contact-wrapper'))

  expect(handleClick).toHaveBeenCalledTimes(1)
})
