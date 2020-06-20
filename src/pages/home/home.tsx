import React from 'react'
import styled from 'styled-components'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import colors from '../../constants/colors'
import TextInput from '../../components/textInput/textInput'
import Button from '../../components/button/button'

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
  height: 300px;
  padding: 32px;
  background: ${colors.navy.light};
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`

const HomeFormElementWrapper = styled.div`
  margin-bottom: 24px;
`

const Home: React.FC = () => (
  <PageWrapper backgroundColor={colors.navy.darker}>
    <HomeFormWrapper>
      <HomeForm>
        <HomeFormElementWrapper>
          <TextInput value="henrique@gmail.com" label="E-MAIL" />
        </HomeFormElementWrapper>
        <HomeFormElementWrapper>
          <TextInput type="password" value="hen" label="PASSWORD" />
        </HomeFormElementWrapper>
        <HomeFormElementWrapper>
          <Button label="Login" backgroundColor={colors.purple.medium} />
        </HomeFormElementWrapper>
      </HomeForm>
    </HomeFormWrapper>
  </PageWrapper>
)

export default Home
