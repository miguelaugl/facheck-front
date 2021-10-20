import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { InvalidCredentialsError } from '@/domain/errors'
import { validationMessages } from '@/presentation/config/yupLocale'
import { ApiContext } from '@/presentation/contexts'
import { AuthenticationSpy } from '@/presentation/tests'

import { Login } from './login'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: () => void
}

const simulateFieldInteraction = async (fieldName: string, value: any): Promise<void> => {
  const input = screen.getByTestId(fieldName)
  await waitFor(() => {
    fireEvent.input(input, { target: { value } })
  })
  await waitFor(() => {
    fireEvent.blur(input)
  })
}

const simulateValidSubmit = async (email = faker.internet.email(), password = '@Teste12345'): Promise<void> => {
  await simulateFieldInteraction('email', email)
  await simulateFieldInteraction('password', password)
  const button = screen.getByTestId('submit')
  userEvent.click(button)
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
      }}
    >
      <Router history={history}>
        <Login authentication={authenticationSpy} />
      </Router>
      ,
    </ApiContext.Provider>,
  )
  return {
    authenticationSpy,
    setCurrentAccountMock,
  }
}

describe('Login Component', () => {
  it('should start with correct initial state', () => {
    makeSut()
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email')).not.toHaveValue()
    expect(screen.getByTestId('password')).not.toHaveValue()
    expect(screen.queryByTestId('main-error')).not.toBeInTheDocument()
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
    await simulateFieldInteraction('email', faker.internet.email())
    await simulateFieldInteraction('password', '@Teste12345')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  it('should show button loading on submit', async () => {
    const { authenticationSpy } = makeSut()
    await simulateFieldInteraction('email', faker.internet.email())
    await simulateFieldInteraction('password', '@Teste12345')
    const button = screen.getByTestId('submit')
    fireEvent.click(button)
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('data-loading')
    await waitFor(() => authenticationSpy.auth)
  })

  it('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = 'Teste!@#12345'
    await simulateValidSubmit(email, password)
    await waitFor(() => authenticationSpy.auth)
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    })
  })

  it('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await waitFor(() => authenticationSpy.auth)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call Authentication if form is invalid', async () => {
    const { authenticationSpy } = makeSut()
    await simulateFieldInteraction('email', faker.internet.email())
    await simulateFieldInteraction('password', '@Teste')
    const button = screen.getByTestId('submit')
    userEvent.click(button)
    await waitFor(() => authenticationSpy.auth)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
      throw error
    })
    await simulateValidSubmit()
    await waitFor(() => authenticationSpy.auth)
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  it('should go to home on submit success', async () => {
    makeSut()
    await waitFor(() => simulateValidSubmit)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should call SaveAcessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    await waitFor(() => authenticationSpy.auth)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.result)
  })
})
