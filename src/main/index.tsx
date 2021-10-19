import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom'

import { theme } from '@/main/config/theme'
import { Login } from '@/presentation/pages'

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Login />
  </ChakraProvider>,
  document.getElementById('root'),
)
