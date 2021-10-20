import { Icon } from '@chakra-ui/icons'
import { Button, InputRightElement } from '@chakra-ui/react'
import { memo, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

import { Input, InputProps } from '@/presentation/components/input/input'

const PasswordInputComponent = (props: InputProps): JSX.Element => {
  const [isPasswordShown, setPasswordShown] = useState(false)
  const handleTogglePasswordShow = (): void => {
    setPasswordShown((prevState) => !prevState)
  }
  return (
    <Input
      {...props}
      type={isPasswordShown ? 'text' : 'password'}
      rightElement={
        <InputRightElement w='40px'>
          <Button
            colorScheme='gray'
            w='32px'
            minW='32px'
            h='32px'
            aria-label={isPasswordShown ? 'Esconder senha' : 'Mostrar senha'}
            onClick={handleTogglePasswordShow}
            data-testid='button'
          >
            <Icon data-testid='icon' as={isPasswordShown ? IoMdEyeOff : IoMdEye} />
          </Button>
        </InputRightElement>
      }
    />
  )
}

export const PasswordInput = memo(PasswordInputComponent)
