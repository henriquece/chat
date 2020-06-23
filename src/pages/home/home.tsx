import React from 'react'
import styled from 'styled-components'
import PageWrapper from '../../components/commons/pageWrapper/pageWrapper'
import colors from '../../constants/colors'
import TextInput from '../../components/commons/textInput/textInput'
import Button from '../../components/commons/button/button'
import Link from '../../components/commons/link/link'
import routesPath from '../../constants/routesPath'
import FormElementWrapper from '../../components/commons/formElementWrapper/formElementWrapper'

const HomeFormWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HomeForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
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

const Home: React.FC = () => (
  <PageWrapper backgroundColor={colors.navy.darker}>
    <HomeFormWrapper>
      <HomeForm>
        <FormElementWrapper marginTop="0px">
          <TextInput value="henrique@gmail.com" label="E-MAIL" />
        </FormElementWrapper>
        <FormElementWrapper>
          <TextInput type="password" value="hen" label="PASSWORD" />
        </FormElementWrapper>
        <FormElementWrapper>
          <Button
            label="Login"
            loading={false}
            backgroundColor={colors.purple.medium}
          />
        </FormElementWrapper>
        <FormElementWrapper marginTop="16px">
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

export default Home
