import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

export const Separator = (props: FlexProps): JSX.Element => {
  return <Flex h='1px' w='100%' bg='linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)' {...props} />
}
