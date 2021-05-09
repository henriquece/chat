import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test('should get button by label text', () => {
  const { getByText } = render(
    <Button variant="clear" label="Button" onClick={() => undefined} />
  )

  getByText('Button')
})
