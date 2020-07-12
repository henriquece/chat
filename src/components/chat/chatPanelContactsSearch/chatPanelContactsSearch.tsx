import React, { useState } from 'react'
import styled from 'styled-components'
import ChatPanelContact from '../chatPanelContact/chatPanelContact'
import colors from '../../../constants/colors'
import TextInput from '../../commons/textInput/textInput'
import { text } from '../../../constants/formElementNames'
import MagnifyingGlassIcon from '../../../assets/icons/magnifying-glass.svg'
import Button from '../../commons/button/button'
import getUsersRequest from '../../../services/user'
import { createConversationRequest } from '../../../services/conversation'
import { SearchedContact, Conversation } from '../../types'
import { validate } from '../../../utils/validation'
import valueTypes from '../../../constants/valueTypes'
import FormElementWrapper from '../../commons/formElementWrapper/formElementWrapper'

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

interface ChatPanelContactsSearchProps {
  updateConversation: (newConversation: Conversation) => void
  disableAddContactMode: () => void
}

const ChatPanelContactsSearch: React.FC<ChatPanelContactsSearchProps> = ({
  updateConversation,
  disableAddContactMode,
}) => {
  const [formElementsValue, setFormElementsValue] = useState<{
    [text]: string
  }>({
    [text]: '',
  })

  const [searchedContacts, setSearchedContacts] = useState<SearchedContact[]>(
    []
  )

  const [alreadySearched, setAlreadySearched] = useState<boolean>(false)

  const searchContacts = async (eventEmail?: string) => {
    const email = eventEmail || formElementsValue[text]

    if (validate(email, valueTypes.email)) {
      const response = await getUsersRequest(email)

      if (response.success) {
        setSearchedContacts(response.data.users)
      }

      setAlreadySearched(true)
    }
  }

  const handleClickOnContact = async (contactId: string) => {
    const response = await createConversationRequest(contactId)

    if (response.success) {
      console.log('ddd', response.data)
      updateConversation(response.data)

      disableAddContactMode()
    }
  }

  return (
    <ChatPanelContactsSearchWrapper>
      <ChatPanelSearchBox>
        <Button onClick={searchContacts} variant="clear">
          <MagnifyingGlassIconStyled />
        </Button>
        <FormElementWrapper flex="1" margin="0">
          <TextInput
            name={text}
            formElementsValue={formElementsValue}
            setFormElementsValue={setFormElementsValue}
            onChange={searchContacts}
            variant="clear"
            placeholder="Search a contact"
          />
        </FormElementWrapper>
      </ChatPanelSearchBox>
      {!alreadySearched || searchedContacts.length ? (
        searchedContacts.map((contact) => (
          <ChatPanelContact
            key={contact._id}
            contactName={contact.name}
            handleClick={() => {
              handleClickOnContact(contact._id)
            }}
          />
        ))
      ) : (
        <NoContactsFound>No contacts found</NoContactsFound>
      )}
    </ChatPanelContactsSearchWrapper>
  )
}

export default ChatPanelContactsSearch
