import React from 'react'
import { render } from '@testing-library/react'
import Button from './index'
import symbols from '../../../constants/symbols'

test('should get button by label text', () => {
  const { getByText } = render(
    <Button label="Button" onClick={() => undefined} />
  )

  getByText('Button')
})

test('should get children content when variant is clear', () => {
  const children = 'Button'

  const { getByText } = render(
    <Button variant="clear" onClick={() => undefined}>
      {children}
    </Button>
  )

  getByText(children)
})

test('should get loading center dot when loading is true', () => {
  const { getByText } = render(<Button loading onClick={() => undefined} />)

  getByText(symbols.centerDot)
})
