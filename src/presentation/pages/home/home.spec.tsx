import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { mockAccountModel } from '@/domain/tests'
import { ApiContext, RoutesContext } from '@/presentation/contexts'
import { LoadMonitoringsSpy } from '@/presentation/tests'

import { Home } from './home'

type SutTypes = {
  loadMonitoringsSpy: LoadMonitoringsSpy
}

const history = createMemoryHistory({ initialEntries: ['/'] })
const makeSut = (): SutTypes => {
  const loadMonitoringsSpy = new LoadMonitoringsSpy()
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
})
