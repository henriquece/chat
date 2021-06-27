import React, { ChangeEvent, Dispatch, SetStateAction, FC } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import { validate } from '../../../utils/validation'

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

const ValidationError = styled.div`
  margin-top: 6px;
  color: ${colors.red.medium};
  font-size: 12px;
  font-style: italic;
`

interface TextInputProps {
  name: string
  type?: 'text' | 'password'
  valueType?: string
  variant?: 'default' | 'clear'
  placeholder?: string
  label?: string
  alt?: string
  validationErrorMessage?: string
  formElementsValue: Record<string, string | number>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormElementsValue: Dispatch<SetStateAction<any>>
  formElementsValidation?: Record<string, boolean>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormElementsValidation?: Dispatch<SetStateAction<any>>
  formValidationVisibility?: boolean
  onChange?: (value: string) => void
  handleEnterKeyPress?: () => void
}

const TextInput: FC<TextInputProps> = ({
  name,
  type = 'text',
  valueType,
  variant = 'default',
  placeholder,
  label,
  alt,
  validationErrorMessage,
  formElementsValue,
  setFormElementsValue,
  formElementsValidation,
  setFormElementsValidation,
  formValidationVisibility,
  onChange,
  handleEnterKeyPress,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    setFormElementsValue({
      ...formElementsValue,
      [name]: value,
    })

    if (setFormElementsValidation) {
      setFormElementsValidation({
        ...formElementsValidation,
        [name]: validate(value, valueType),
      })
    }

    if (onChange) {
      onChange(value)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && handleEnterKeyPress) {
      handleEnterKeyPress()
    }
  }

  return (
    <TextInputWrapper>
      {label && <Label>{label}</Label>}
      <Input
        type={type}
        variant={variant}
        value={formElementsValue[name]}
        placeholder={placeholder}
        spellCheck={false}
        alt={alt}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {formValidationVisibility &&
        formElementsValidation &&
        !formElementsValidation[name] && (
          <ValidationError>
            {validationErrorMessage || 'Invalid field'}
          </ValidationError>
        )}
    </TextInputWrapper>
  )
}

export default TextInput
