import valueTypes from '../constants/valueTypes'

const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return regex.test(email)
}

const validate = (value: string, valueType: string) => {
  switch (valueType) {
    case valueTypes.email:
      return validateEmail(value)
    default:
      return value.length > 0
  }
}

const isFormValid = (formElementsValidation: object) => {
  const validationValues = Object.values(formElementsValidation)

  return validationValues.indexOf(false) === -1
}

export { validate, isFormValid }
