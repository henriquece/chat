import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatConversationHeader from './index'
import PageContext from '../../../contexts/pageContext'

const contactName = 'João'

test('should render contactName and contactName initial letter', () => {
  render(
    <ChatConversationHeader
      contactName={contactName}
      toggleToPanelOnMobile={() => null}
    />
  )

  screen.getByText(contactName)

  screen.getByText('J')
})

test('should fire toggleToPanelOnMobile when is mobile', () => {
  const toggleToPanelOnMobile = jest.fn()

  render(
    <PageContext.Provider value={{ isMobile: true }}>
      <ChatConversationHeader
        contactName={contactName}
        toggleToPanelOnMobile={toggleToPanelOnMobile}
      />
    </PageContext.Provider>
  )

  userEvent.click(screen.getByTestId('left-arrow-icon'))

  expect(toggleToPanelOnMobile).toHaveBeenCalledTimes(1)
})
