import styled from 'styled-components'

const FormElementWrapper = styled.div<{
  flex?: string
  margin?: string
}>`
  flex: ${({ flex }) => flex || 'intial'};
  margin: ${({ margin }) => margin || '24px 0 0'};
`

export default FormElementWrapper
