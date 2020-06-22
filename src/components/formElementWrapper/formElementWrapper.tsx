import styled from 'styled-components'

const FormElementWrapper = styled.div<{
  marginTop?: string
}>`
  margin-top: ${({ marginTop }) => marginTop || '24px'};
`

export default FormElementWrapper
