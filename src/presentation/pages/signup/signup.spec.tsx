import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'

import { mockAddAccountParams } from '@/domain/tests'
import { validationMessages } from '@/presentation/config/yup'
import { ApiContext } from '@/presentation/contexts'
import { AddAccountSpy, simulateFieldInteraction } from '@/presentation/tests'

import { SignUp } from './signup'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: () => void
}

const simulateValidSubmit = async (addAccountParams = mockAddAccountParams()): Promise<void> => {
  await simulateFieldInteraction('name', addAccountParams.name)
  await simulateFieldInteraction('course', addAccountParams.course)
  await simulateFieldInteraction('ra', addAccountParams.ra)
  await simulateFieldInteraction('cpf', addAccountParams.cpf)
  await simulateFieldInteraction('email', addAccountParams.email)
  await simulateFieldInteraction('password', addAccountParams.password)
  await simulateFieldInteraction('passwordConfirmation', addAccountParams.passwordConfirmation)
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('submit'))
  })
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
      }}
    >
      <Router history={history}>
        <SignUp addAccount={addAccountSpy} />
      </Router>
      ,
    </ApiContext.Provider>,
  )
  return {
    addAccountSpy,
    setCurrentAccountMock,
  }
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
    expect(screen.getByTestId('passwordConfirmation')).not.toHaveValue()
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

  it('should show course validation error', async () => {
    makeSut()
    const courseInput = screen.getByTestId('course')
    await waitFor(() => {
      fireEvent.blur(courseInput)
    })
    expect(await screen.findByTestId('course-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    const courseMinLength = '3'
    const minLengthValidation = (validationMessages.string.min as string).replace(/\${min}/, courseMinLength)
    await waitFor(() => {
      fireEvent.input(courseInput, { target: { value: 'aa' } })
    })
    expect(await screen.findByTestId('course-error-message')).toHaveTextContent(minLengthValidation)
  })

  it('should show ra validation error', async () => {
    makeSut()
    const raInput = screen.getByTestId('ra')
    await waitFor(() => {
      fireEvent.blur(raInput)
    })
    expect(await screen.findByTestId('ra-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    await waitFor(() => {
      fireEvent.input(raInput, { target: { value: '12345' } })
    })
    const raLength = '13'
    const lengthMessage = (validationMessages.string.length as string).replace(/\${length}/, raLength)
    expect(await screen.findByTestId('ra-error-message')).toHaveTextContent(lengthMessage)
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

  it('should show passwordConfirmation validation error', async () => {
    makeSut()
    const passwordConfirmationInput = screen.getByTestId('passwordConfirmation')
    const passwordInput = screen.getByTestId('password')
    await waitFor(() => {
      fireEvent.blur(passwordConfirmationInput)
    })
    expect(await screen.findByTestId('passwordConfirmation-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    await waitFor(() => {
      fireEvent.input(passwordInput, { target: { value: '@Teste12345' } })
      fireEvent.input(passwordConfirmationInput, { target: { value: 'other_value' } })
    })
    expect(await screen.findByTestId('passwordConfirmation-error-message')).toHaveTextContent('As senhas não batem.')
  })

  it('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await simulateValidSubmit(addAccountParams)
    await waitFor(() => addAccountSpy.add)
    expect(addAccountSpy.params).toEqual(addAccountParams)
  })

  it('should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    fireEvent.click(screen.getByTestId('submit'))
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  it('should not call AddAccount if form is invalid', async () => {
    const { addAccountSpy } = makeSut()
    await simulateFieldInteraction('email', faker.random.word())
    const button = screen.getByTestId('submit')
    fireEvent.click(button)
    await waitFor(() => addAccountSpy.add)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  it('should go to home on submit success', async () => {
    makeSut()
    await waitFor(() => simulateValidSubmit)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should call SaveAcessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    await waitFor(() => addAccountSpy.add)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.result)
  })

  it('should go to login page', async () => {
    makeSut()
    fireEvent.click(screen.getByTestId('login-link'))
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/login')
  })
})
