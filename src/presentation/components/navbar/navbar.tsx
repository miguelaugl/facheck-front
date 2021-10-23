import { Flex, Text, Icon } from '@chakra-ui/react'
import { useContext } from 'react'
import { HiUser } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'

import { ApiContext, RoutesContext } from '@/presentation/contexts'

export const Navbar = (): JSX.Element => {
  const { routes } = useContext(RoutesContext)
  const { getCurrentAccount } = useContext(ApiContext)
  const account = getCurrentAccount()
  const location = useLocation()
  const activeRoute = routes.find((route) => route.path === location.pathname)
  return (
    <Flex w='100%' justifyContent='space-between' alignItems='center' padding='2' paddingLeft='4' paddingRight='8' mb='8'>
      <Text color='black' data-testid='screen-name' fontSize='md' fontWeight='medium'>
        {activeRoute.name}
      </Text>
      <Flex alignItems='center' color='gray'>
        <Icon as={HiUser} me='2' boxSize='1.5rem' />
        <Text fontWeight='medium' data-testid='username'>
          {account.name}
        </Text>
      </Flex>
    </Flex>
  )
}
