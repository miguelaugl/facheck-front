import { render, screen } from '@testing-library/react'

import { Login } from './login'

describe('Login Component', () => {
  it('should start with correct initial state', () => {
    render(<Login />)
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email')).not.toHaveValue()
    expect(screen.getByTestId('password')).not.toHaveValue()
    expect(screen.queryByTestId('error-wrap')).not.toBeInTheDocument()
  })
})
