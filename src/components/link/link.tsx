import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

const RouterLinkWrapper = styled.div<{
  backgroundColor: string
}>`
  background: ${({ backgroundColor }) => backgroundColor};
`

const RouterLinkStyled = styled(RouterLink)`
  text-decoration: none;
`

interface LinkProps {
  to: string
  label: string
  backgroundColor?: string
}

const Link: React.FC<LinkProps> = ({
  to,
  label,
  backgroundColor = 'transparent',
}) => (
  <RouterLinkWrapper backgroundColor={backgroundColor}>
    <RouterLinkStyled to={to}>{label}</RouterLinkStyled>
  </RouterLinkWrapper>
)

export default Link
