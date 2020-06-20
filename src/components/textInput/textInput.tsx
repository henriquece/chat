import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

const TextInputWrapper = styled.div``

const Label = styled.label`
  display: block;
  padding: 0 0 10px 4px;
  color: ${colors.text.lightBlue};
  font-size: 12px;
`

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.navy.darker};
  border-radius: 4px;
  background: ${colors.navy.dark};
  color: ${colors.text.white};
  outline: none;
  transition: 0.2s;

  &:focus {
    border-color: ${colors.purple.medium};
  }
`

interface TextInputProps {
  type?: 'text' | 'password'
  value: string
  label: string
}

const TextInput: React.FC<TextInputProps> = ({
  type = 'text',
  value,
  label,
}) => (
  <TextInputWrapper>
    <Label>{label}</Label>
    <Input type={type} value={value} spellCheck={false} />
  </TextInputWrapper>
)

export default TextInput
