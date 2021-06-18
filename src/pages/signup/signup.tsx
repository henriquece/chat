import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import PageWrapper from '../../components/commons/pageWrapper'
import colors from '../../constants/colors'
import TextInput from '../../components/commons/textInput'
import Button from '../../components/commons/button'
import FormElementWrapper from '../../components/commons/formElementWrapper'
import { email, name, password } from '../../constants/formElementNames'
import { signupRequest } from '../../services/auth'
import { isFormValid } from '../../utils/validation'
import routesPath from '../../constants/routesPath'
import valueTypes from '../../constants/valueTypes'

const SignupFormWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  margin: 0 16px;
  padding: 32px;
  background: ${colors.navy.light};
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`

const defaultValidationErrorMessages = {
  [email]: 'Invalid email address',
  [password]: 'Invalid password',
}

const Signup: React.FC = () => {
  const history = useHistory()

  const [formElementsValue, setFormElementsValue] = useState<{
    email: string
    name: string
    password: string
  }>({
    email: '',
    name: '',
    password: '',
  })

  const [formElementsValidation, setFormElementsValidation] = useState<{
    [email]: boolean
    [name]: boolean
    [password]: boolean
  }>({
    [email]: false,
    [name]: false,
    [password]: false,
  })

  const [validationErrorMessages, setValidationErrorMessages] = useState<{
    [email]: string
  }>({
    [email]: defaultValidationErrorMessages[email],
  })

  const [formValidationVisibility, setFormValidationVisibility] = useState<
    boolean
  >(false)

  const [loading, setLoading] = useState<boolean>(false)

  const handleClickOnSignupButton = async () => {
    if (!formValidationVisibility) {
      setFormValidationVisibility(true)
    }

    if (isFormValid(formElementsValidation)) {
      setLoading(true)

      const response = await signupRequest(
        formElementsValue[email],
        formElementsValue[name],
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

        history.push(routesPath.chat)
      } else {
        const {
          data: { message },
        } = response

        if (message === 'email address already exists') {
          setFormElementsValidation({
            ...formElementsValidation,
            [email]: false,
          })

          setValidationErrorMessages({
            ...defaultValidationErrorMessages,
            [email]: 'This email address already exists',
          })
        }
      }
    }
  }

  return (
    <PageWrapper backgroundColor={colors.navy.darker}>
      <SignupFormWrapper>
        <SignupForm>
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
              name={name}
              label="NAME"
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
              formElementsValue={formElementsValue}
              setFormElementsValue={setFormElementsValue}
              formElementsValidation={formElementsValidation}
              setFormElementsValidation={setFormElementsValidation}
              formValidationVisibility={formValidationVisibility}
            />
          </FormElementWrapper>
          <FormElementWrapper>
            <Button
              label="Sign Up"
              loading={loading}
              onClick={handleClickOnSignupButton}
            />
          </FormElementWrapper>
        </SignupForm>
      </SignupFormWrapper>
    </PageWrapper>
  )
}

export default Signup
