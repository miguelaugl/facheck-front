import { Box, Stack } from '@chakra-ui/layout'
import { useContext } from 'react'

import { Logo } from '@/presentation/components'
import { RoutesContext } from '@/presentation/contexts'

import { SidebarLink } from './sidebar-link'

export const Sidebar = (): JSX.Element => {
  const { routes } = useContext(RoutesContext)
  return (
    <Box display={{ sm: 'none', xl: 'block' }} position='fixed'>
      <Box
        bg='none'
        transition='0.2s linear'
        w='260px'
        maxW='260px'
        ms={{
          sm: '16px',
        }}
        my={{
          sm: '16px',
        }}
        h='calc(100vh - 32px)'
        ps='20px'
        pe='20px'
        m='0px'
        borderRadius='0px'
      >
        <Logo />
        <Stack direction='column'>
          <Box>
            {routes.map((route) => {
              if (route.isPrivate) {
                return <SidebarLink key={route.name} path={route.path as string} icon={route.icon} label={route.name} />
              }
              return null
            })}
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
