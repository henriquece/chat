import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PageWrapper from '../../components/commons/pageWrapper'
import colors from '../../constants/colors'
import TextInput from '../../components/commons/textInput'
import Button from '../../components/commons/button'
import Link from '../../components/commons/link'
import routesPath from '../../constants/routesPath'
import FormElementWrapper from '../../components/commons/formElementWrapper'
import { email, password } from '../../constants/formElementNames'
import valueTypes from '../../constants/valueTypes'
import { isFormValid } from '../../utils/validation'
import { signinRequest } from '../../services/auth'
import {
  setUserId,
  setUserName,
  setConversationSelectedId,
} from '../../store/actions'

const HomeFormWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HomeForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: 0 16px;
  padding: 32px;
  background: ${colors.navy.light};
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`

const HomeFormSignupWrapper = styled.div`
  display: flex;
`

const HomeFormSignupText = styled.div`
  margin-right: 4px;
  color: ${colors.text.lightBlue};
  font-size: 14px;
`

const validationErrorMessages = {
  [email]: 'Invalid email address',
  [password]: 'Invalid password',
}

const Home: React.FC = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const [formElementsValue, setFormElementsValue] = useState<{
    [email]: string
    [password]: string
  }>({
    [email]: '',
    [password]: '',
  })

  const [formElementsValidation, setFormElementsValidation] = useState<{
    [email]: boolean
    [password]: boolean
  }>({
    [email]: false,
    [password]: false,
  })

  const [formValidationVisibility, setFormValidationVisibility] = useState<
    boolean
  >(false)

  const [loading, setLoading] = useState<boolean>(false)

  const handleClickOnLoginButton = async () => {
    if (!formValidationVisibility) {
      setFormValidationVisibility(true)
    }

    if (isFormValid(formElementsValidation)) {
      setLoading(true)

      const response = await signinRequest(
        formElementsValue[email],
        formElementsValue[password]
      )

      setLoading(false)

      if (response.success) {
        const {
          data: { userId, userName, token },
        } = response

        localStorage.setItem('userId', userId)

        localStorage.setItem('userName', userName)

        localStorage.setItem('token', token)

        dispatch(setUserId(userId))

        dispatch(setUserName(userName))

        dispatch(setConversationSelectedId(null))

        history.push(routesPath.chat)
      } else {
        const {
          data: { message },
        } = response

        if (message === 'email incorrect') {
          setFormElementsValidation({
            ...formElementsValidation,
            [email]: false,
          })
        } else if (message === 'password incorrect') {
          setFormElementsValidation({
            ...formElementsValidation,
            [password]: false,
          })
        }
      }
    }
  }

  return (
    <PageWrapper backgroundColor={colors.navy.darker}>
      <HomeFormWrapper>
        <HomeForm>
          <FormElementWrapper margin="0">
            <TextInput
              name={email}
              valueType={valueTypes.email}
              label="E-MAIL"
              validationErrorMessage={validationErrorMessages[email]}
              formElementsValue={formElementsValue}
              setFormElementsValue={setFormElementsValue}
              formElementsValidation={formElementsValidation}
              setFormElementsValidation={setFormElementsValidation}
              formValidationVisibility={formValidationVisibility}
            />
          </FormElementWrapper>
          <FormElementWrapper>
            <TextInput
              name={password}
              type="password"
              label="PASSWORD"
              validationErrorMessage={validationErrorMessages[password]}
              formElementsValue={formElementsValue}
              setFormElementsValue={setFormElementsValue}
              formElementsValidation={formElementsValidation}
              setFormElementsValidation={setFormElementsValidation}
              formValidationVisibility={formValidationVisibility}
              handleEnterKeyPress={handleClickOnLoginButton}
            />
          </FormElementWrapper>
          <FormElementWrapper>
            <Button
              label="Login"
              loading={loading}
              onClick={handleClickOnLoginButton}
            />
          </FormElementWrapper>
          <FormElementWrapper margin="16px 0 0">
            <HomeFormSignupWrapper>
              <HomeFormSignupText>Don't have an account?</HomeFormSignupText>
              <Link
                to={routesPath.signup}
                label="Sign Up"
                color={colors.purple.medium}
              />
            </HomeFormSignupWrapper>
          </FormElementWrapper>
        </HomeForm>
      </HomeFormWrapper>
    </PageWrapper>
  )
}

export default Home
