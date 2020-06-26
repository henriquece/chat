import React from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'

const TextInputWrapper = styled.div``

const Label = styled.label`
  display: block;
  padding: 0 0 10px 4px;
  color: ${colors.text.lightBlue};
  font-size: 12px;
`

const Input = styled.input<{
  variant?: string
}>`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: ${({ variant }) =>
    variant === 'clear' ? 'none' : `1px solid ${colors.navy.darker}`};
  border-radius: 4px;
  background: ${({ variant }) =>
    variant === 'clear' ? 'initial' : colors.navy.dark};
  color: ${colors.text.white};
  outline: none;
  transition: 0.2s;

  &:focus {
    border: ${({ variant }) =>
      variant === 'clear' ? 'none' : `1px solid ${colors.purple.medium}`};
  }
`

interface TextInputProps {
  value: string
  variant?: 'default' | 'clear'
  placeholder?: string
  type?: 'text' | 'password'
  label?: string
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  variant = 'default',
  placeholder,
  type = 'text',
  label,
}) => (
  <TextInputWrapper>
    {label && <Label>{label}</Label>}
    <Input
      type={type}
      variant={variant}
      value={value}
      placeholder={placeholder}
      spellCheck={false}
      onChange={() => {}}
    />
  </TextInputWrapper>
)

export default TextInput
