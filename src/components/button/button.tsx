import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

const ButtonWrapper = styled.button<{
  backgroundColor: string
}>`
  width: 100%;
  height: 40px;
  border: 0px;
  border-radius: 3px;
  background: ${colors.purple.medium};
  font-size: 15px;
  color: ${colors.text.white};
  outline: none;
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    background: ${colors.purple.dark};
  }
`

interface ButtonProps {
  label: string
  backgroundColor?: string
}

const Button: React.FC<ButtonProps> = ({
  label,
  backgroundColor = 'transparent',
}) => <ButtonWrapper backgroundColor={backgroundColor}>{label}</ButtonWrapper>

export default Button
