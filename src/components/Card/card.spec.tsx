import {render, screen} from '@testing-library/react'
import Card from './index'

describe('auth', () => {
  test('something', () => {
    render(<Card>
      <h1>oi</h1>
    </Card>)

    expect(true).toBeTruthy()
  })
})