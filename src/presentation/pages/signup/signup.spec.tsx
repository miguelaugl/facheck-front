import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'

import { validationMessages } from '@/presentation/config/yup'

import { SignUp } from './signup'

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (): void => {
  render(
    <Router history={history}>
      <SignUp />
    </Router>,
  )
}

describe('SignUp Component', () => {
  it('should start with correct initial state', () => {
    makeSut()
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('name')).not.toHaveValue()
    expect(screen.getByTestId('ra')).not.toHaveValue()
    expect(screen.getByTestId('cpf')).not.toHaveValue()
    expect(screen.getByTestId('email')).not.toHaveValue()
    expect(screen.getByTestId('password')).not.toHaveValue()
    expect(screen.getByTestId('confirmPassword')).not.toHaveValue()
    expect(screen.queryByTestId('main-error')).not.toBeInTheDocument()
  })

  it('should show name validation error', async () => {
    makeSut()
    const nameInput = screen.getByTestId('name')
    await waitFor(() => {
      fireEvent.blur(nameInput)
    })
    expect(await screen.findByTestId('name-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    const nameMinLength = '3'
    const minLengthValidation = (validationMessages.string.min as string).replace(/\${min}/, nameMinLength)
    await waitFor(() => {
      fireEvent.input(nameInput, { target: { value: 'aa' } })
    })
    expect(await screen.findByTestId('name-error-message')).toHaveTextContent(minLengthValidation)
  })

  it('should show ra validation error', async () => {
    makeSut()
    const raInput = screen.getByTestId('ra')
    await waitFor(() => {
      fireEvent.blur(raInput)
    })
    expect(await screen.findByTestId('ra-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    await waitFor(() => {
      fireEvent.input(raInput, { target: { value: 'any_value' } })
    })
    expect(await screen.findByTestId('ra-error-message')).toHaveTextContent(validationMessages.onlyDigits)
  })

  it('should show email validation error', async () => {
    makeSut()
    const emailInput = screen.getByTestId('email')
    await waitFor(() => {
      fireEvent.blur(emailInput)
    })
    expect(await screen.findByTestId('email-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    await waitFor(() => {
      fireEvent.input(emailInput, { target: { value: 'any_value' } })
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
      fireEvent.input(passwordInput, { target: { value: 'any_value' } })
    })
    expect(await screen.findByTestId('password-error-message')).toHaveTextContent(validationMessages.passwordStrength)
  })

  it('should show confirmPassword validation error', async () => {
    makeSut()
    const confirmPasswordInput = screen.getByTestId('confirmPassword')
    const passwordInput = screen.getByTestId('password')
    await waitFor(() => {
      fireEvent.blur(confirmPasswordInput)
    })
    expect(await screen.findByTestId('confirmPassword-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    await waitFor(() => {
      fireEvent.input(passwordInput, { target: { value: '@Teste12345' } })
      fireEvent.input(confirmPasswordInput, { target: { value: 'other_value' } })
    })
    expect(await screen.findByTestId('confirmPassword-error-message')).toHaveTextContent('As senhas não batem.')
  })
})
