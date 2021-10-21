import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/tests'
import { ApiContext, RoutesContext } from '@/presentation/contexts'

import { Navbar } from './navbar'

type SutTypes = {
  account: AccountModel
}

const history = createMemoryHistory({ initialEntries: ['/navbar'] })
const makeSut = (): SutTypes => {
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
  return {
    account,
  }
}

describe('Navbar Component', () => {
  it('should present correct name', () => {
    const { account } = makeSut()
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })

  it('should present correct screen name', () => {
    makeSut()
    expect(screen.getByTestId('screen-name')).toHaveTextContent('Navbar')
  })
})
