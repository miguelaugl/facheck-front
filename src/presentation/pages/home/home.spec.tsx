import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/tests'
import { ApiContext, RoutesContext } from '@/presentation/contexts'
import { LoadMonitoringsSpy } from '@/presentation/tests'

import { Home } from './home'

type SutTypes = {
  loadMonitoringsSpy: LoadMonitoringsSpy
  setCurrentAccountMock: () => void
}

const history = createMemoryHistory({ initialEntries: ['/'] })
const makeSut = (loadMonitoringsSpy = new LoadMonitoringsSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  render(
    <RoutesContext.Provider
      value={{
        routes: [
          { path: '/', name: 'Dashboard' },
          { path: '/login', name: 'Login' },
        ],
      }}
    >
      <ApiContext.Provider
        value={{
          setCurrentAccount: setCurrentAccountMock,
          getCurrentAccount: () => mockAccountModel(),
        }}
      >
        <Router history={history}>
          <Home loadMonitorings={loadMonitoringsSpy} />
        </Router>
      </ApiContext.Provider>
    </RoutesContext.Provider>,
  )
  return {
    loadMonitoringsSpy,
    setCurrentAccountMock,
  }
}

describe('Home Component', () => {
  it('should call LoadMonitorings', async () => {
    const { loadMonitoringsSpy } = makeSut()
    await waitFor(() => screen.getByTestId('monitoring-list'))
    expect(loadMonitoringsSpy.callsCount).toBe(1)
  })

  it('should render 2 Monitorings on success', async () => {
    makeSut()
    expect(await screen.findAllByTestId('monitoring-item')).toHaveLength(2)
  })

  it('should render error on UnexpectedError', async () => {
    const loadMonitoringsSpy = new LoadMonitoringsSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadMonitoringsSpy, 'load').mockRejectedValueOnce(error)
    makeSut(loadMonitoringsSpy)
    expect(await screen.findByTestId('monitoring-list')).not.toBeInTheDocument()
    expect(await screen.findByTestId('error')).toHaveTextContent(error.message)
  })

  it('should logout on AccessDeniedError', async () => {
    const loadMonitoringsSpy = new LoadMonitoringsSpy()
    jest.spyOn(loadMonitoringsSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock } = makeSut(loadMonitoringsSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(history.location.pathname).toBe('/login')
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
  })

  it('should call LoadSurveyList on reload', async () => {
    const loadMonitoringsSpy = new LoadMonitoringsSpy()
    jest.spyOn(loadMonitoringsSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadMonitoringsSpy)
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadMonitoringsSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
