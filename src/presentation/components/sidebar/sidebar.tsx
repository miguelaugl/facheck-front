import { Box, Stack, Icon, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { IoMdLogOut } from 'react-icons/io'

import { useLogout } from '@/hooks'
import { Logo } from '@/presentation/components'
import { RoutesContext } from '@/presentation/contexts'

import { LinkButton } from './link-button'
import { SidebarLink } from './sidebar-link'

export const Sidebar = (): JSX.Element => {
  const logout = useLogout()
  const { routes } = useContext(RoutesContext)
  return (
    <Box display={{ sm: 'none', xl: 'block' }} position='fixed'>
      <Flex
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
        direction='column'
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
        <LinkButton text='Logout' icon={<Icon as={IoMdLogOut} />} mt='auto' onClick={logout} />
      </Flex>
    </Box>
  )
}
