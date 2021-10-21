import { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'

export const PrivateRoute = (props: RouteProps): JSX.Element => {
  const { getCurrentAccount } = useContext(ApiContext)

  return getCurrentAccount()?.accessToken ? <Route {...props} /> : <Route {...props} component={() => <Redirect to='/login' />} />
}
