import { Button, Flex, Icon, useColorModeValue, Text } from '@chakra-ui/react'

import { IconBox } from '@/presentation/components'

type Props = {
  text: string
  icon?: string | React.ReactNode
  isActive?: boolean
}

export const LinkButton = ({ text, icon, isActive }: Props): JSX.Element => {
  const activeBg = useColorModeValue('white', 'gray.700')
  const inactiveBg = useColorModeValue('white', 'gray.700')
  const activeColor = useColorModeValue('gray.700', 'white')
  const inactiveColor = useColorModeValue('gray.400', 'gray.400')
  return (
    <Button
      boxSize='initial'
      justifyContent='flex-start'
      alignItems='center'
      boxShadow={isActive ? '0px 7px 11px rgba(0, 0, 0, 0.04)' : 'none'}
      bg={isActive ? activeBg : 'transparent'}
      mb={{
        xl: '12px',
      }}
      mx={{
        xl: 'auto',
      }}
      py='12px'
      ps={{
        sm: '10px',
        xl: '16px',
      }}
      borderRadius='15px'
      w='100%'
      _active={{
        bg: 'inherit',
        transform: 'none',
        borderColor: 'transparent',
      }}
      _hover={{}}
      _focus={{
        boxShadow: isActive ? '0px 7px 11px rgba(0, 0, 0, 0.04)' : 'none',
      }}
    >
      <Flex>
        {typeof icon === 'string' ? (
          <Icon>{icon}</Icon>
        ) : (
          <IconBox
            bg={isActive ? 'purple.500' : inactiveBg}
            color={isActive ? 'white' : 'purple.500'}
            h='30px'
            w='30px'
            me='12px'
            transition='0.2s linear'
          >
            {icon}
          </IconBox>
        )}
        <Text color={isActive ? activeColor : inactiveColor} my='auto' fontSize='sm'>
          {text}
        </Text>
      </Flex>
    </Button>
  )
}
