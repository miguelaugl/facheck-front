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
    makeSut()
    const emailInput = screen.getByTestId('email')
    await waitFor(() => {
      fireEvent.blur(emailInput)
    })
    expect(await screen.findByTestId('email-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    await waitFor(() => {
      userEvent.type(emailInput, faker.random.words())
    })
    expect(await screen.findByTestId('email-error-message')).toHaveTextContent(validationMessages.string.email as string)
  })

  it('should show password validation error', async () => {
    makeSut()
    const passwordInput = screen.getByTestId('password')
    await waitFor(() => {
      fireEvent.blur(passwordInput)
    })
    expect(await screen.findByTestId('password-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    await waitFor(() => {
      userEvent.type(passwordInput, faker.random.word())
    })
    expect(await screen.findByTestId('password-error-message')).toHaveTextContent(validationMessages.passwordStrengh)
  })

  it('should enable submit button if form is valid', async () => {
    makeSut()
    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    await waitFor(() => {
      fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
      fireEvent.input(passwordInput, { target: { value: '@Teste12345' } })
    })
    await waitFor(() => {
      fireEvent.blur(emailInput)
      fireEvent.blur(passwordInput)
    })
    expect(screen.getByTestId('submit')).toBeEnabled()
  })
})
