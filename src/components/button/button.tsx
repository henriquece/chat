import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import colors from '../../constants/colors'
import symbols from '../../constants/symbols'

const dots = keyframes`
  0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      12px 0 0 rgba(0,0,0,0),
      24px 0 0 rgba(0,0,0,0);
  }
  40% {
    color: white;
    text-shadow:
      12px 0 0 rgba(0,0,0,0),
      24px 0 0 rgba(0,0,0,0);
  }
  60% {
    text-shadow:
      12px 0 0 white,
      24px 0 0 rgba(0,0,0,0);
  }
  80%, 100% {
    text-shadow:
      12px 0 0 white,
      24px 0 0 white;
  }
`

const ButtonWrapper = styled.button<{
  backgroundColor: string
}>`
  width: 100%;
  height: 40px;
  border: 0px;
  border-radius: 3px;
  background: ${colors.purple.medium};
  font-size: 32px;
  line-height: 32px;
  color: ${colors.text.white};
  outline: none;
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    background: ${colors.purple.dark};
  }
`

const CenterDot = styled.div<{
  loading: number
}>`
  transform: translateX(-12px);
  animation: ${({ loading }) =>
    loading
      ? css`
          ${dots} 1s steps(5, end) infinite;
        `
      : 'initial'};
`

interface ButtonProps {
  label: string
  loading: boolean
  backgroundColor?: string
}

const Button: React.FC<ButtonProps> = ({
  label,
  loading,
  backgroundColor = 'transparent',
}) => (
  <ButtonWrapper backgroundColor={backgroundColor}>
    {loading ? (
      <CenterDot loading={loading ? 1 : 0}>{symbols.centerDot}</CenterDot>
    ) : (
      label
    )}
  </ButtonWrapper>
)

export default Button
