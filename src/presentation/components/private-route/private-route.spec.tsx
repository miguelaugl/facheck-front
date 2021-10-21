import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { ComponentType } from 'react'
import { Router } from 'react-router-dom'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/tests'
import { ApiContext } from '@/presentation/contexts'

import { PrivateRoute } from './private-route'

type SutTypes = {
  getCurrentAccountMock: () => AccountModel
}

const history = createMemoryHistory()
const makeSut = (component: ComponentType<any>): SutTypes => {
  const getCurrentAccountMock = (): AccountModel => mockAccountModel()
  render(
    <ApiContext.Provider value={{ getCurrentAccount: getCurrentAccountMock }}>
      <Router history={history}>
        <PrivateRoute component={component} />
      </Router>
    </ApiContext.Provider>,
  )
  return {
    getCurrentAccountMock,
  }
}

describe('PrivateRoute Component', () => {
  it('should render Private Component', () => {
    const PrivateComponent = (): JSX.Element => <>Private</>
    makeSut(PrivateComponent)
    expect(screen.getByText('Private')).toBeInTheDocument()
  })
})
