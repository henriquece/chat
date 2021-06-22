import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import colors from '../../../constants/colors'

const RouterLinkWrapper = styled.div<{
  backgroundColor: string
}>`
  background: ${({ backgroundColor }) => backgroundColor};
`

const RouterLinkStyled = styled(RouterLink)<{
  color: string
}>`
  display: block;
  text-decoration: none;
  color: ${({ color }) => color};
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`

interface LinkProps {
  to: string
  label: string
  backgroundColor?: string
  color?: string
}

const Link: React.FC<LinkProps> = ({
  to,
  label,
  backgroundColor = colors.transparent,
  color = colors.text.white,
}) => (
  <RouterLinkWrapper backgroundColor={backgroundColor}>
    <RouterLinkStyled to={to} color={color}>
      {label}
    </RouterLinkStyled>
  </RouterLinkWrapper>
)

export default Link
