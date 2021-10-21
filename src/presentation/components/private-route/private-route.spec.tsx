import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router, Switch, Route } from 'react-router-dom'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/tests'
import { ApiContext } from '@/presentation/contexts'

import { PrivateRoute } from './private-route'

const history = createMemoryHistory({ initialEntries: ['/private'] })
const makeSut = (getCurrentAccountMock: any = jest.fn()): void => {
  const PrivateComponent = (): JSX.Element => <>Private</>
  render(
    <ApiContext.Provider value={{ getCurrentAccount: getCurrentAccountMock }}>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path='/private' component={PrivateComponent} />
          <Route exact path='/login' component={() => <>Login</>} />
        </Switch>
      </Router>
    </ApiContext.Provider>,
  )
}

describe('PrivateRoute Component', () => {
  it('should render Private Component', () => {
    const getCurrentAccountMock = (): AccountModel => mockAccountModel()
    makeSut(getCurrentAccountMock)
    expect(screen.getByText('Private')).toBeInTheDocument()
  })

  it('should redirect to login', () => {
    makeSut()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})
