import React from 'react'
import { render } from '@testing-library/react'
import Button from './index'

test('should get button by label text', () => {
  const { getByText } = render(
    <Button label="Button" onClick={() => undefined} />
  )

  getByText('Button')
})
