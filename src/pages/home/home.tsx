import React, { useState } from 'react'
import styled from 'styled-components'
import PageWrapper from '../../components/commons/pageWrapper/pageWrapper'
import colors from '../../constants/colors'
import TextInput from '../../components/commons/textInput/textInput'
import Button from '../../components/commons/button/button'
import Link from '../../components/commons/link/link'
import routesPath from '../../constants/routesPath'
import FormElementWrapper from '../../components/commons/formElementWrapper/formElementWrapper'
import { email, password } from '../../constants/formElementNames'
import valueTypes from '../../constants/valueTypes'
import { isFormValid } from '../../utils/validation'
import { signupRequest } from '../../services/auth'

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
  const [formElementsValue, setFormElementsValue] = useState<{
    [email]: string
    [password]: string
  }>({
    [email]: 'a@a.com',
    [password]: '1234',
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

      const response = await signupRequest(
        formElementsValue[email],
        formElementsValue[password]
      )

      console.log('00000000', response)

      setTimeout(() => {
        setLoading(false)

        if (response.success) {
          console.log('legal')
        } else {
          setFormElementsValidation({
            ...formElementsValidation,
            email: false,
          })
        }
      }, 500)
    }
  }

  return (
    <PageWrapper backgroundColor={colors.navy.darker}>
      <HomeFormWrapper>
        <HomeForm>
          <FormElementWrapper margin="0">
            <TextInput
              name={email}
              formElementsValue={formElementsValue}
              setFormElementsValue={setFormElementsValue}
              formElementsValidation={formElementsValidation}
              setFormElementsValidation={setFormElementsValidation}
              formValidationVisibility={formValidationVisibility}
              valueType={valueTypes.email}
              label="E-MAIL"
            />
          </FormElementWrapper>
          <FormElementWrapper>
            <TextInput
              name={password}
              formElementsValue={formElementsValue}
              setFormElementsValue={setFormElementsValue}
              formElementsValidation={formElementsValidation}
              setFormElementsValidation={setFormElementsValidation}
              formValidationVisibility={formValidationVisibility}
              type="password"
              label="PASSWORD"
            />
          </FormElementWrapper>
          <FormElementWrapper>
            <Button
              label="Login"
              loading={loading}
              onClick={handleClickOnLoginButton}
              backgroundColor={colors.purple.medium}
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
