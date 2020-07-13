import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
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

const Home: React.FC = () => {
  const history = useHistory()

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
    [email]: true,
    [password]: true,
  })

  const [formValidationVisibility, setFormValidationVisibility] = useState<
    boolean
  >(true)

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

      setTimeout(() => {
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
          setFormElementsValidation({
            ...formElementsValidation,
            email: false,
          })
        }
      }, 400)
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
