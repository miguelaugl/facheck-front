import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { mockAccountModel } from '@/domain/tests'
import { ApiContext, RoutesContext } from '@/presentation/contexts'

import { Navbar } from './navbar'

describe('Navbar Component', () => {
  it('should present correct name', () => {
    const history = createMemoryHistory({ initialEntries: ['/navbar'] })
    const account = mockAccountModel()
    render(
      <RoutesContext.Provider value={{ routes: [{ path: '/navbar', name: 'Navbar' }] }}>
        <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
          <Router history={history}>
            <Navbar />
          </Router>
        </ApiContext.Provider>
      </RoutesContext.Provider>,
    )
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
