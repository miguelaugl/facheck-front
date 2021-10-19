import { CheckCircleIcon } from '@chakra-ui/icons'
import { InputRightElement, ScaleFade, Tooltip } from '@chakra-ui/react'
import React from 'react'

type Props = {
  shouldShow: boolean
}

export const ValidFeedbackIcon = ({ shouldShow }: Props): JSX.Element => {
  return (
    <ScaleFade initialScale={0.9} in={shouldShow}>
      <Tooltip label="Tudo certo!" placement="top">
        <InputRightElement>
          <CheckCircleIcon color="green.300"/>
        </InputRightElement>
      </Tooltip>
    </ScaleFade>
  )
}
