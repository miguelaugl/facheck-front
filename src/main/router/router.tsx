import '@/presentation/config/yup'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Switch } from 'react-router-dom'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { theme } from '@/main/config/theme'
import { CustomRoute } from '@/presentation/components'
import { ApiContext, RoutesContext } from '@/presentation/contexts'

import { routes } from './routes'

export const Router = (): JSX.Element => {
  return (
    <RoutesContext.Provider
      value={{
        routes,
      }}
    >
      <ApiContext.Provider
        value={{
          setCurrentAccount: setCurrentAccountAdapter,
          getCurrentAccount: getCurrentAccountAdapter,
        }}
      >
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              {routes.map((route) => (
                <CustomRoute key={route.name} {...route} />
              ))}
            </Switch>
          </BrowserRouter>
        </ChakraProvider>
      </ApiContext.Provider>
    </RoutesContext.Provider>
  )
}
