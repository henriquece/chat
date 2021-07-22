import React from 'react'
import { render } from '@testing-library/react'
import ChatConversationMessages from './index'
import { Message } from '../../../types'
import {
  getYearMonthDayNumber,
  convertYearMonthDayNumberToWords,
} from '../../../utils/date'

const testDate = 1624928415150

test('should render message and date badge', () => {
  const messages: Message[] = [
    { _id: '1', content: 'Olá', date: testDate, userId: '1' },
  ]

  const { getByText } = render(<ChatConversationMessages messages={messages} />)

  getByText('Olá')

  const numericDate = getYearMonthDayNumber(testDate)

  const dateBadgeContent = convertYearMonthDayNumberToWords(numericDate)

  getByText(dateBadgeContent)
})
