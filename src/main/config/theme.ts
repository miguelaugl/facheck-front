import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

export const theme = extendTheme(
  {
    components: {
      Button: {
        baseStyle: {
          lineHeight: 1.5,
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'purple',
  }),
)
