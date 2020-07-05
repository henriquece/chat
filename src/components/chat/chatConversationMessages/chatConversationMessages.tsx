import React from 'react'
import styled from 'styled-components'
import {
  getYearMonthDayNumber,
  convertYearMonthDayNumberToWords,
} from '../../../utils/date'
import colors from '../../../constants/colors'
import { Message, UserId } from '../../types'

const ChatConversationMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 80px;
  background: ${colors.navy.dark};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.navy.lighter};
  }
}
`

const DateBadge = styled.div`
  align-self: center;
  margin-top: 8px;
  padding: 3px 8px;
  border-radius: 16px;
  background: ${colors.navy.light};
  color: ${colors.white};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`

const MessageWrapper = styled.div<{
  sent: boolean
}>`
  align-self: ${({ sent }) => (sent ? 'flex-end' : 'flex-start')};
  margin-top: 8px;
  padding: 6px 7px;
  border-radius: 4px;
  background: ${({ sent }) => (sent ? colors.blue.light : colors.navy.lighter)};
  color: ${colors.white};
  font-size: 14px;
`

const addDateBadges = (messages) => {
  const messagesWithNumericDate = messages.map((msg) => {
    return {
      ...msg,
      numericDate: getYearMonthDayNumber(msg.date),
    }
  })

  const dateBadges = messagesWithNumericDate
    .map((msg, index) => {
      if (
        !index ||
        msg.numericDate !== messagesWithNumericDate[index - 1].numericDate
      ) {
        return {
          index,
          date: msg.date,
          numericDate: msg.numericDate,
        }
      }
      return false
    })
    .filter((dayBadge) => dayBadge)

  const messagesAndDateBadges = [...messages]

  let dateBadgeSpliceIncrement = 0

  dateBadges.forEach((dateBadge) => {
    const dateBadgeContent = convertYearMonthDayNumberToWords(
      dateBadge.numericDate
    )

    messagesAndDateBadges.splice(
      dateBadge.index + dateBadgeSpliceIncrement,
      0,
      {
        id: `${dateBadge.date}${dateBadge.index}`,
        content: dateBadgeContent,
        dateBadge: true,
      }
    )

    dateBadgeSpliceIncrement += 1
  })

  return messagesAndDateBadges
}

interface ChatConversationMessagesProps {
  userId: UserId
  messages: Message[]
}

const ChatConversationMessages: React.FC<ChatConversationMessagesProps> = ({
  userId,
  messages,
}) => {
  const messagesAndDateBadges = addDateBadges(messages)

  return (
    <ChatConversationMessagesWrapper>
      {messagesAndDateBadges.map((msg) =>
        msg.dateBadge ? (
          <DateBadge key={msg.id}>{msg.content}</DateBadge>
        ) : (
          <MessageWrapper key={msg._id} sent={msg.userId === userId}>
            {msg.content}
          </MessageWrapper>
        )
      )}
    </ChatConversationMessagesWrapper>
  )
}

export default ChatConversationMessages
