import '@/presentation/config/yup'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { setCurrentAccountAdapter } from '@/main/adapters'
import { theme } from '@/main/config/theme'
import { makeLogin } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { SignUp } from '@/presentation/pages'

export const Router = (): JSX.Element => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
      }}
    >
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact component={makeLogin} />
            <Route path='/signup' exact component={SignUp} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </ApiContext.Provider>
  )
}
