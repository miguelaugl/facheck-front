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
      <ApiContext.Provider value={{ getCurrentAccount: () => ({ accessToken: 'any_token', name: 'any_name' }) }}>
        <Router history={history}>
          <CustomRoute isPrivate component={PrivateComponent} />
        </Router>
      </ApiContext.Provider>,
    )
    expect(screen.getByText('Private')).toBeInTheDocument()
  })
})
