import '@/presentation/config/yup'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { theme } from '@/main/config/theme'
import { makeLogin, makeSignUp } from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

export const Router = (): JSX.Element => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact component={makeLogin} />
            <Route path='/signup' exact component={makeSignUp} />
            <PrivateRoute path='/signup' exact component={makeSignUp} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </ApiContext.Provider>
  )
}
