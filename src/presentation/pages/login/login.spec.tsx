import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { Login } from './login'

const makeSut = (): void => {
  render(<Login />)
}

describe('Login Component', () => {
  it('should start with correct initial state', () => {
    makeSut()
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email')).not.toHaveValue()
    expect(screen.getByTestId('password')).not.toHaveValue()
    expect(screen.queryByTestId('error-wrap')).not.toBeInTheDocument()
  })

  it('should show email validation error', async () => {
    render(<Login />)
    const emailInput = screen.getByTestId('email')
    userEvent.type(emailInput, faker.random.words())
    fireEvent.blur(emailInput)
    await waitFor(() => {
      expect(screen.getByTestId('email-error-message')).toHaveTextContent('email must be a valid email')
    })
    userEvent.clear(emailInput)
    await waitFor(() => {
      expect(screen.getByTestId('email-error-message')).toHaveTextContent('email is a required field')
    })
  })
})
