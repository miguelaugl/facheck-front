import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'

import { SignUp } from './signup'

describe('SignUp Component', () => {
  it('should start with correct initial state', () => {
    const history = createMemoryHistory({ initialEntries: ['/signup'] })
    render(
      <Router history={history}>
        <SignUp />
      </Router>,
    )
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('name')).not.toHaveValue()
    expect(screen.getByTestId('ra')).not.toHaveValue()
    expect(screen.getByTestId('cpf')).not.toHaveValue()
    expect(screen.getByTestId('email')).not.toHaveValue()
    expect(screen.getByTestId('password')).not.toHaveValue()
    expect(screen.getByTestId('confirmPassword')).not.toHaveValue()
    expect(screen.queryByTestId('main-error')).not.toBeInTheDocument()
  })
})
