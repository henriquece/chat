import React from 'react'
import { render } from '@testing-library/react'
import ChatConversationMessages from './index'
import { Message } from '../../../types'

test('should render message and date badge', () => {
  const messages: Message[] = [
    { _id: '1', content: 'Olá', date: 1624928415150, userId: '1' },
  ]

  const { getByText } = render(<ChatConversationMessages messages={messages} />)

  getByText('Olá')

  getByText('28 de Junho de 2021')
})
