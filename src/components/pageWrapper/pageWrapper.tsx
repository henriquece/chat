import styled from 'styled-components'

const PageWrapper = styled.div<{
  backgroundColor: string
}>`
  height: 100%;
  background: ${({ backgroundColor }) => backgroundColor};
`

export default PageWrapper
