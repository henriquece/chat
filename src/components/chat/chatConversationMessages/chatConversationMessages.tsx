import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  getYearMonthDayNumber,
  convertYearMonthDayNumberToWords,
} from '../../../utils/date'
import colors from '../../../constants/colors'
import { Message, UserId } from '../../types'
import { tablet } from '../../../constants/mediaQueryBreakpoints'

const ChatConversationMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 16px 0;
  background: ${colors.navy.dark};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.navy.lighter};
  }

  @media ${tablet} {
    padding: 16px 80px 0;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 8px;
  margin-right: ${({ sent }) => (sent ? '0' : '40px')};
  margin-left: ${({ sent }) => (sent ? '40px' : '0')};
  padding: 6px 7px 3px 7px;
  border-radius: 4px;
  background: ${({ sent }) => (sent ? colors.blue.light : colors.navy.lighter)};
  font-size: 14px;
`

const MessageContent = styled.div`
  color: ${colors.white};
`

const MessageTime = styled.div<{
  sent: boolean
}>`
  color: ${({ sent }) => (sent ? colors.blue.lighter : colors.text.lightBlue)};
  font-size: 12px;
  margin: 5px 0 0 8px;
`

const Space = styled.div`
  height: 16px;
  color: ${colors.navy.dark};
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

  const messagesAndDateBadges = messages.map((msg) => {
    const date = new Date(msg.date)

    const newMsg = {
      ...msg,
      hourAndMinuteDate: `${date.getHours()}:${date.getMinutes()}`,
    }

    return newMsg
  })

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
  const messagesWrapperRef = useRef<HTMLInputElement | null>(null)

  const [lastMessageId, setLastMessageId] = useState('')

  useEffect(() => {
    const newLastMessage = messages[messages.length - 1]

    const newLastMessageId = newLastMessage && newLastMessage._id

    if (
      newLastMessageId !== lastMessageId &&
      messagesWrapperRef &&
      messagesWrapperRef.current
    ) {
      messagesWrapperRef.current.scrollTop =
        messagesWrapperRef.current.scrollHeight

      setLastMessageId(newLastMessageId)
    }
  }, [messages])

  const messagesAndDateBadges = addDateBadges(messages)

  return (
    <ChatConversationMessagesWrapper ref={messagesWrapperRef}>
      {messagesAndDateBadges.map((msg) =>
        msg.dateBadge ? (
          <DateBadge key={msg.id}>{msg.content}</DateBadge>
        ) : (
          <MessageWrapper key={msg._id} sent={msg.userId === userId}>
            <MessageContent>{msg.content}</MessageContent>
            <MessageTime sent={msg.userId === userId}>
              {msg.hourAndMinuteDate}
            </MessageTime>
          </MessageWrapper>
        )
      )}
      <Space>-</Space>
    </ChatConversationMessagesWrapper>
  )
}

export default ChatConversationMessages
