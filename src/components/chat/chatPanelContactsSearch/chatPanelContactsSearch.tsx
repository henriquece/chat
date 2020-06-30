import React, { useState } from 'react'
import styled from 'styled-components'
import ChatPanelContact from '../chatPanelContact/chatPanelContact'
import colors from '../../../constants/colors'
import TextInput from '../../commons/textInput/textInput'
import { text } from '../../../constants/formElementNames'
import MagnifyingGlassIcon from '../../../assets/icons/magnifying-glass.svg'
import Button from '../../commons/button/button'
import { getUsersRequest } from '../../../services/user'

const ChatPanelContactsSearchWrapper = styled.div``

const ChatPanelSearchBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid ${colors.navy.dark};
`

const MagnifyingGlassIconStyled = styled(MagnifyingGlassIcon)`
  padding: 0 8px;

  & > path {
    fill: ${colors.white};
  }
`

const ChatPanelContactsSearch: React.FC = () => {
  const [formElementsValue, setFormElementsValue] = useState<{
    [text]: string
  }>({
    [text]: '',
  })

  const [searchedContacts, setSearchedContacts] = useState<
    {
      name: string
      email: string
    }[]
  >([])

  const handleClickOnSearchButton = async () => {
    if (formElementsValue[text]) {
      // setLoading(true)

      const response = await getUsersRequest(formElementsValue[text])

      // setLoading(false)

      if (response.success) {
        const {
          data: { users },
        } = response
        setSearchedContacts(users)
      } else {
        // ss
      }
    }
  }

  return (
    <ChatPanelContactsSearchWrapper>
      <ChatPanelSearchBox>
        <Button onClick={handleClickOnSearchButton} variant="clear">
          <MagnifyingGlassIconStyled />
        </Button>
        <TextInput
          name={text}
          formElementsValue={formElementsValue}
          setFormElementsValue={setFormElementsValue}
          variant="clear"
          placeholder="Search a contact"
        />
      </ChatPanelSearchBox>
      {searchedContacts.map((contact) => (
        <ChatPanelContact
          key={contact.email}
          variant="search"
          contactName={contact.name}
        />
      ))}
    </ChatPanelContactsSearchWrapper>
  )
}

export default ChatPanelContactsSearch
