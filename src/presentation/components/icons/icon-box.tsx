import { Flex, FlexProps } from '@chakra-ui/react'

export const IconBox = ({ children, ...rest }: FlexProps): JSX.Element => {
  return (
    <Flex alignItems='center' justifyContent='center' borderRadius='12px' {...rest}>
      {children}
    </Flex>
  )
}
