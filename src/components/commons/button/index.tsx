import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import colors from '../../../constants/colors'
import symbols from '../../../constants/symbols'

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
  variant: Variant
}>`
  width: ${({ variant }) => (variant === 'clear' ? 'initial' : '100%')};
  height: 40px;
  padding: ${({ variant }) =>
    variant === 'clear' ? '0px !important' : 'initial'};
  border: 0px;
  border-radius: 3px;
  background: ${({ variant }) =>
    variant === 'clear' ? 'transparent' : colors.purple.medium};
  color: ${colors.text.white};
  outline: none;
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    background: ${({ variant }) =>
      variant === 'clear' ? 'transparent' : colors.purple.dark};
  }
`

const CenterDot = styled.div<{
  loading: number
}>`
  font-size: ${({ loading }) => (loading ? '32px' : 'initial')};
  line-height: ${({ loading }) => (loading ? '32px' : 'initial')};
  transform: translate(-12px, -3px);
  animation: ${({ loading }) =>
    loading
      ? css`
          ${dots} 1s steps(5, end) infinite;
        `
      : 'initial'};
`

type Variant = 'default' | 'clear'

interface ButtonProps {
  onClick: () => void
  label?: string
  loading?: boolean
  variant?: Variant
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  label,
  loading,
  variant = 'default',
}) => {
  const defaultButtonContent = loading ? (
    <CenterDot loading={loading ? 1 : 0}>{symbols.centerDot}</CenterDot>
  ) : (
    label
  )

  return (
    <ButtonWrapper onClick={onClick} variant={variant}>
      {variant === 'clear' ? children : defaultButtonContent}
    </ButtonWrapper>
  )
}

export default Button
