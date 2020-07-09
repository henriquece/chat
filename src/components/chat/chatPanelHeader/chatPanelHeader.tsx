import React from 'react'
import styled, { css } from 'styled-components'
import { UserName } from '../../types'
import colors from '../../../constants/colors'
import getInitialCapitalized from '../../../utils/string'
import PlusIcon from '../../../assets/icons/plus.svg'
import TalkBalloonIcon from '../../../assets/icons/talk-balloon.svg'
import ThreeDotsIcon from '../../../assets/icons/three-dots.svg'
import Button from '../../commons/button/button'

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

const UserNameWrapper = styled.div`
  flex: 1;
  margin-left: 16px;
  color: ${colors.text.white};
  font-weight: 700;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
`

const iconStyle = css`
  padding: 0 8px;

  & > path {
    fill: ${colors.white};
  }
`

const PlusIconStyled = styled(PlusIcon)`
  ${iconStyle}
`

const TalkBalloonIconStyled = styled(TalkBalloonIcon)`
  ${iconStyle}
`

const ThreeDotsIconStyled = styled(ThreeDotsIcon)`
  ${iconStyle}
`

interface ChatPanelHeaderProps {
  userName: UserName
  addContactMode: boolean
  toggleAddContactMode: () => void
}

const ChatPanelHeader: React.FC<ChatPanelHeaderProps> = ({
  userName,
  addContactMode,
  toggleAddContactMode,
}) => (
  <ChatPanelHeaderWrapper>
    <UserPicture>{getInitialCapitalized(userName)}</UserPicture>
    <UserNameWrapper>{userName}</UserNameWrapper>
    <Icons>
      <Button onClick={toggleAddContactMode} variant="clear">
        {addContactMode ? <TalkBalloonIconStyled /> : <PlusIconStyled />}
      </Button>
      <ThreeDotsIconStyled />
    </Icons>
  </ChatPanelHeaderWrapper>
)

export default ChatPanelHeader
