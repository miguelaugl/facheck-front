import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { validationMessages } from '@/presentation/config/yupLocale'

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
      expect(screen.getByTestId('email-error-message')).toHaveTextContent(validationMessages.string.email as string)
    })
    userEvent.clear(emailInput)
    await waitFor(() => {
      expect(screen.getByTestId('email-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    })
  })

  it('should show password validation error', async () => {
    render(<Login />)
    const passwordInput = screen.getByTestId('password')
    userEvent.type(passwordInput, faker.random.word())
    fireEvent.blur(passwordInput)
    await waitFor(() => {
      expect(screen.getByTestId('password-error-message')).toHaveTextContent(validationMessages.passwordStrengh)
    })
    userEvent.clear(passwordInput)
    await waitFor(() => {
      expect(screen.getByTestId('password-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    })
  })
})
