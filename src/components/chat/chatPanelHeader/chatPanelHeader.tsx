import React from 'react'
import styled from 'styled-components'
import { UserInfo } from '../../types'
import colors from '../../../constants/colors'
import ThreeDotsIcon from '../../../assets/icons/three-dots.svg'
import getInitialCapitalized from '../../../utils/string'

const ChatPanelHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: ${colors.navy.light};
`

const UserPicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.blue.medium};
  color: ${colors.text.white};
  font-weight: 700;
`

const ThreeDotsIconStyled = styled(ThreeDotsIcon)`
  & > path {
    fill: ${colors.white};
  }
`

interface ChatPanelHeaderProps {
  userInfo: UserInfo
}

const ChatPanelHeader: React.FC<ChatPanelHeaderProps> = ({ userInfo }) => (
  <ChatPanelHeaderWrapper>
    <UserPicture>{getInitialCapitalized(userInfo.name)}</UserPicture>
    <ThreeDotsIconStyled />
  </ChatPanelHeaderWrapper>
)

export default ChatPanelHeader
