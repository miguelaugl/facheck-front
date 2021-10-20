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

  it('should show cpf validation error', async () => {
    makeSut()
    const cpfInput = screen.getByTestId('cpf')
    await waitFor(() => {
      fireEvent.blur(cpfInput)
    })
    expect(await screen.findByTestId('cpf-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    await waitFor(() => {
      fireEvent.input(cpfInput, { target: { value: 'any_value' } })
    })
    expect(await screen.findByTestId('cpf-error-message')).toHaveTextContent(validationMessages.cpf)
  })
})
