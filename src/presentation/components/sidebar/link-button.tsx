import { Button, Flex, Icon, Text, ButtonProps } from '@chakra-ui/react'

import { IconBox } from '@/presentation/components'

type Props = {
  text: string
  icon?: string | React.ReactNode
  isActive?: boolean
} & ButtonProps

export const LinkButton = ({ text, icon, isActive, ...rest }: Props): JSX.Element => {
  const activeBg = 'white'
  const inactiveBg = 'gray.100'
  const activeColor = 'gray.700'
  const inactiveColor = 'gray.400'
  return (
    <Button
      boxSize='initial'
      justifyContent='flex-start'
      alignItems='center'
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
      {...rest}
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
        <Text color={isActive ? activeColor : inactiveColor} my='auto' fontSize='sm' fontWeight='semibold'>
          {text}
        </Text>
      </Flex>
    </Button>
  )
}
