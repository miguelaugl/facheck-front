import { Icon } from '@chakra-ui/icons'
import { Button, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

import { Input, Props as BaseInputProps } from '@/presentation/components/input/input'

export const PasswordInputComponent = (props: BaseInputProps): JSX.Element => {
  const [isPasswordShown, setPasswordShown] = useState(false)
  const handleTogglePasswordShow = (): void => {
    setPasswordShown(prevState => !prevState)
  }
  return (
    <Input
      {...props}
      rightElement={
        <InputRightElement w="40px">
          <Button
            colorScheme="gray"
            w="32px"
            minW="32px"
            h="32px"
            aria-label={isPasswordShown ? 'Esconder senha' : 'Mostrar senha'}
            onClick={handleTogglePasswordShow}
          >
            <Icon as={isPasswordShown ? IoMdEyeOff : IoMdEye} />
          </Button>
        </InputRightElement>
      }
    />
  )
}
