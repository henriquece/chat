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

const NoContactsFound = styled.div`
  margin-top: 24px;
  color: ${colors.text.lightBlue};
  font-size: 14px;
  text-align: center;
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

  const [alreadySearched, setAlreadySearched] = useState<boolean>(false)

  const searchContacts = async () => {
    if (formElementsValue[text]) {
      const response = await getUsersRequest(formElementsValue[text])

      if (response.success) {
        setSearchedContacts(response.data.users)
      }

      setAlreadySearched(true)
    }
  }

  const handleClickOnContact = () => {}

  return (
    <ChatPanelContactsSearchWrapper>
      <ChatPanelSearchBox>
        <Button onClick={searchContacts} variant="clear">
          <MagnifyingGlassIconStyled />
        </Button>
        <TextInput
          name={text}
          formElementsValue={formElementsValue}
          setFormElementsValue={setFormElementsValue}
          handleEnterKeyPress={searchContacts}
          variant="clear"
          placeholder="Search a contact"
        />
      </ChatPanelSearchBox>
      {!alreadySearched || searchedContacts.length ? (
        searchedContacts.map((contact) => (
          <ChatPanelContact
            key={contact.email}
            variant="search"
            contactName={contact.name}
            handleClick={handleClickOnContact}
          />
        ))
      ) : (
        <NoContactsFound>No contacts found</NoContactsFound>
      )}
    </ChatPanelContactsSearchWrapper>
  )
}

export default ChatPanelContactsSearch
