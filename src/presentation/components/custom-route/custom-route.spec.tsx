import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'

import { CustomRoute } from './custom-route'

describe('CustomRoute Component', () => {
  it('should render Private Component', () => {
    const history = createMemoryHistory()
    const PrivateComponent = (): JSX.Element => <>Private</>
    render(
      <ApiContext.Provider value={{ getCurrentAccount: () => ({ id: 'any_id', accessToken: 'any_token', name: 'any_name' }) }}>
        <Router history={history}>
          <CustomRoute isPrivate component={PrivateComponent} />
        </Router>
      </ApiContext.Provider>,
    )
    expect(screen.getByText('Private')).toBeInTheDocument()
  })

  it('should render Public Component', () => {
    const history = createMemoryHistory()
    const PublicComponent = (): JSX.Element => <>Public</>
    render(
      <ApiContext.Provider value={{ getCurrentAccount: () => ({ id: 'any_id', accessToken: 'any_token', name: 'any_name' }) }}>
        <Router history={history}>
          <CustomRoute component={PublicComponent} />
        </Router>
      </ApiContext.Provider>,
    )
    expect(screen.getByText('Public')).toBeInTheDocument()
  })
})
