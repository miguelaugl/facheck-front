import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/tests'
import { ApiContext, RoutesContext } from '@/presentation/contexts'
import { LoadMonitoringsSpy } from '@/presentation/tests'

import { Home } from './home'

type SutTypes = {
  loadMonitoringsSpy: LoadMonitoringsSpy
}

const history = createMemoryHistory({ initialEntries: ['/'] })
const makeSut = (loadMonitoringsSpy = new LoadMonitoringsSpy()): SutTypes => {
  render(
    <RoutesContext.Provider value={{ routes: [{ path: '/', name: 'Dashboard' }] }}>
      <ApiContext.Provider
        value={{
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
})
