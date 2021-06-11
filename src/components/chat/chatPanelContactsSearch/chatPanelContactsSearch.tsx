import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import ChatPanelContact from '../chatPanelContact'
import colors from '../../../constants/colors'
import TextInput from '../../commons/textInput'
import { text } from '../../../constants/formElementNames'
import MagnifyingGlassIcon from '../../../assets/icons/magnifying-glass.svg'
import Button from '../../commons/button'
import getUsersRequest from '../../../services/user'
import { createConversationRequest } from '../../../services/conversation'
import { validate } from '../../../utils/validation'
import valueTypes from '../../../constants/valueTypes'
import FormElementWrapper from '../../commons/formElementWrapper'
import { SearchedContact } from '../../../types'
import { RootState } from '../../../store/reducers'
import { updateConversations } from '../../../utils/conversations'
import {
  setConversationSelectedId,
  setConversations,
} from '../../../store/actions'

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
  disableAddContactMode: () => void
}

const ChatPanelContactsSearch: React.FC<ChatPanelContactsSearchProps> = ({
  disableAddContactMode,
}) => {
  const [userId, conversations] = useSelector((state: RootState) => [
    state.user.userId,
    state.conversations.conversations,
  ])

  const dispatch = useDispatch()

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
        const currentUserContacts = conversations.map(
          (conversation) => conversation.contactId
        )

        const fetchedContacts = response.data.users

        const fetchedContactsFiltered = fetchedContacts.filter(
          (contact) =>
            !currentUserContacts.includes(contact._id) && contact._id !== userId
        )

        setSearchedContacts(fetchedContactsFiltered)
      }

      setAlreadySearched(true)
    }
  }

  const handleClickOnContact = async (contactId: string) => {
    const response = await createConversationRequest(contactId)

    if (response.success) {
      const conversation = response.data

      const updatedConversations = updateConversations(
        conversations,
        conversation
      )

      dispatch(setConversations(updatedConversations))

      dispatch(setConversationSelectedId(conversation._id))

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
