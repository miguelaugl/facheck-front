import { Box, ScaleFade } from '@chakra-ui/react'

import { Navbar, Sidebar } from '@/presentation/components'

type Props = {
  children: React.ReactNode
}

export const AdminLayout = ({ children }: Props): JSX.Element => {
  return (
    <ScaleFade in>
      <Box
        bg='gray.50'
        __css={{
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Sidebar />
        <Box
          __css={{
            float: 'right',
            maxWidth: '100%',
            overflow: 'auto',
            position: 'relative',
            maxHeight: '100%',
            transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
            transitionDuration: '.2s, .2s, .35s',
            transitionProperty: 'top, bottom, width',
            transitionTimingFunction: 'linear, linear, ease',
          }}
          w={{
            base: '100%',
            xl: 'calc(100% - 275px)',
          }}
          padding='30px 15px'
        >
          <Navbar />
          {children}
        </Box>
      </Box>
    </ScaleFade>
  )
}
