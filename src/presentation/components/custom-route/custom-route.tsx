import { Route, RouteProps } from 'react-router-dom'

import { PrivateRoute } from '@/presentation/components'

export type CustomRouteProps = {
  name?: string
  isPrivate?: boolean
  icon?: string | React.ReactNode
} & RouteProps

export const CustomRoute = (props: CustomRouteProps): JSX.Element => {
  return props.isPrivate ? <PrivateRoute {...props} /> : <Route {...props} />
}
