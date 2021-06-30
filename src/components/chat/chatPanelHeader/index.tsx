import React from 'react'
import styled, { css } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import colors from '../../../constants/colors'
import getInitialCapitalized from '../../../utils/string'
import PlusIcon from '../../../assets/icons/plus.svg'
import TalkBalloonIcon from '../../../assets/icons/talk-balloon.svg'
import LogoutIcon from '../../../assets/icons/logout.svg'
import Button from '../../commons/button'
import routesPath from '../../../constants/routesPath'
import { setConversations } from '../../../store/actions'

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

const ButtonWrapper = styled.div`
  margin: 0 10px;
`

const iconStyle = css`
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

const LogoutIconStyled = styled(LogoutIcon)`
  ${iconStyle}
`

interface ChatPanelHeaderProps {
  addContactMode: boolean
  toggleAddContactMode: () => void
  closeSocket: () => void
}

const ChatPanelHeader: React.FC<ChatPanelHeaderProps> = ({
  addContactMode,
  toggleAddContactMode,
  closeSocket,
}) => {
  const history = useHistory()

  const dispatch = useDispatch()

  const userName = localStorage.getItem('userName') || ''

  const handleClickOnLogoutButton = async () => {
    dispatch(setConversations([]))

    history.push(routesPath.home)

    localStorage.removeItem('userId')

    localStorage.removeItem('userName')

    localStorage.removeItem('token')

    closeSocket()
  }

  return (
    <ChatPanelHeaderWrapper>
      <UserPicture>{getInitialCapitalized(userName)}</UserPicture>
      <UserNameWrapper>{userName}</UserNameWrapper>
      <Icons>
        <ButtonWrapper>
          <Button
            testid="add-contact-mode-button"
            onClick={toggleAddContactMode}
            variant="clear"
          >
            {addContactMode ? <TalkBalloonIconStyled /> : <PlusIconStyled />}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={handleClickOnLogoutButton} variant="clear">
            <LogoutIconStyled />
          </Button>
        </ButtonWrapper>
      </Icons>
    </ChatPanelHeaderWrapper>
  )
}

export default ChatPanelHeader
