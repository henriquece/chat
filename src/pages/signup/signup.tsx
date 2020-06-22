import React from 'react'
import styled from 'styled-components'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import colors from '../../constants/colors'
import TextInput from '../../components/textInput/textInput'
import Button from '../../components/button/button'
import FormElementWrapper from '../../components/formElementWrapper/formElementWrapper'

const SignupFormWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 32px;
  background: ${colors.navy.light};
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`

const Signup: React.FC = () => (
  <PageWrapper backgroundColor={colors.navy.darker}>
    <SignupFormWrapper>
      <SignupForm>
        <FormElementWrapper marginTop="0px">
          <TextInput value="eu@gmail.com" label="E-MAIL" />
        </FormElementWrapper>
        <FormElementWrapper>
          <TextInput value="Henrique" label="NAME" />
        </FormElementWrapper>
        <FormElementWrapper>
          <TextInput type="password" value="hen" label="PASSWORD" />
        </FormElementWrapper>
        <FormElementWrapper>
          <Button
            label="Sign Up"
            loading
            backgroundColor={colors.purple.medium}
          />
        </FormElementWrapper>
      </SignupForm>
    </SignupFormWrapper>
  </PageWrapper>
)

export default Signup
