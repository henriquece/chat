import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Comp from './comp'

test('should have "clique" on label', () => {
  const { getByText } = render(<Comp onClick={() => {}} />)

  const div = getByText('Clique')

  expect(div).toHaveTextContent('Clique')
})
