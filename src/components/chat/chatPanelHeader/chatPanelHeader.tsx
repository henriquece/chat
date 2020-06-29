import React from 'react'
import styled from 'styled-components'
import { UserInfo } from '../../types'
import colors from '../../../constants/colors'
import getInitialCapitalized from '../../../utils/string'
import ThreeDotsIcon from '../../../assets/icons/three-dots.svg'
import PlusIcon from '../../../assets/icons/plus.svg'

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
  background: ${colors.blue.light};
  color: ${colors.text.white};
  font-weight: 700;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
`

const PlusIconStyled = styled(PlusIcon)`
  padding: 0 8px;

  & > path {
    fill: ${colors.white};
  }
`

const ThreeDotsIconStyled = styled(ThreeDotsIcon)`
  padding: 0 8px;

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
    <Icons>
      <PlusIconStyled />
      <ThreeDotsIconStyled />
    </Icons>
  </ChatPanelHeaderWrapper>
)

export default ChatPanelHeader
