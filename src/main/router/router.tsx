import '@/presentation/config/yupLocale'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { theme } from '@/main/config/theme'
import { Login } from '@/presentation/pages'

export const Router = (): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  )
}
