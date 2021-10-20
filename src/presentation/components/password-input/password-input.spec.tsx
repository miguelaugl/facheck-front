import { render, screen, fireEvent } from '@testing-library/react'

import { PasswordInput } from './password-input'

describe('PasswordInput Component', () => {
  it('should present correct initial state', () => {
    render(<PasswordInput label='Senha:' name='password' />)
    const input = screen.getByTestId('password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('should show password', () => {
    render(<PasswordInput label='Senha:' name='password' />)
    const toggleButton = screen.getByTestId('icon')
    const input = screen.getByTestId('password')
    fireEvent.click(toggleButton)
    expect(input).toHaveAttribute('type', 'text')
  })
})
