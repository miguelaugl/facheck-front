import '@/presentation/config/yupLocale'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { setCurrentAccountAdapter } from '@/main/adapters'
import { theme } from '@/main/config/theme'
import { makeLogin } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'

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
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </ApiContext.Provider>
  )
}
