import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextInput from './index'

const name = 'email'
const label = 'Label'
const email = 'test@test.com'
const formElementsValue = { [name]: email }

test('should render label and value', () => {
  const { getByText, getByAltText } = render(
    <TextInput
      name={name}
      label={label}
      alt={name}
      formElementsValue={formElementsValue}
      setFormElementsValue={() => null}
    />
  )

  getByText(label)

  expect(getByAltText(name).getAttribute('value')).toBe(email)
})

test('should fire setFormElementsValue function when typing', () => {
  const setFormElementsValue = jest.fn()

  const { getByAltText } = render(
    <TextInput
      name="text-input"
      label={label}
      alt={name}
      formElementsValue={formElementsValue}
      setFormElementsValue={setFormElementsValue}
    />
  )

  userEvent.type(getByAltText(name), 'test')

  expect(setFormElementsValue).toHaveBeenCalledTimes(4)
})

test('should fire handleEnterKeyPress function when typing enter', () => {
  const handleEnterKeyPress = jest.fn()

  const { getByAltText } = render(
    <TextInput
      name="text-input"
      label={label}
      alt={name}
      formElementsValue={formElementsValue}
      setFormElementsValue={() => null}
      handleEnterKeyPress={handleEnterKeyPress}
    />
  )

  userEvent.type(getByAltText(name), '{enter}')

  expect(handleEnterKeyPress).toHaveBeenCalledTimes(1)
})

test('should render error message', () => {
  const errorMessage = 'Invalid email'

  const formElementsValidation = { [name]: true }

  const { getByText } = render(
    <TextInput
      name="text-input"
      label={label}
      formElementsValue={formElementsValue}
      setFormElementsValue={() => null}
      validationErrorMessage={errorMessage}
      formElementsValidation={formElementsValidation}
      formValidationVisibility={true}
    />
  )

  getByText(errorMessage)
})
