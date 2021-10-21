import { createContext } from 'react'

import { CustomRouteProps } from '@/presentation/components'

type Props = {
  routes?: CustomRouteProps[]
}

export const RoutesContext = createContext<Props>(null)
