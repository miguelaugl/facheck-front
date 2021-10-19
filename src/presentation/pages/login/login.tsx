import { EmailIcon, LockIcon, Icon } from '@chakra-ui/icons'
import { Heading, Input, FormLabel, InputGroup, InputLeftElement, Stack, Link, Button, InputRightElement, FormControl, FormErrorMessage, AlertIcon, Alert } from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

import styles from './styles.module.css'

export const Login = (): JSX.Element => {
  const [isPasswordShown, setPasswordShown] = useState(false)
  const [formState] = useState({
    email: '',
    password: '',
    isEmailInvalid: false,
    isPasswordInvalid: false,
    isFormInvalid: function () {
      return this.isEmailInvalid || this.isPasswordInvalid
    },
  })
  const handleTogglePasswordShow = (): void => {
    setPasswordShown(prevState => !prevState)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <Stack as="form" spacing={4}>
            <Heading as="h1">Logar-se</Heading>
            <FormControl isInvalid={formState.isEmailInvalid}>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                >
                  <EmailIcon color="gray.300" />
                </InputLeftElement>
                <Input id="email" name="email" focusBorderColor="purple.500" placeholder="Digite seu email" />
              </InputGroup>
              <FormErrorMessage>O email está incorreto.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formState.isPasswordInvalid}>
              <FormLabel htmlFor="password">Senha:</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                >
                  <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input id="password" name="password" type={isPasswordShown ? 'text' : 'password'} focusBorderColor="purple.500" placeholder="Digite sua senha" />
                <InputRightElement w="40px">
                  <Button colorScheme="gray" w="32px" minW="32px" h="32px" aria-label={isPasswordShown ? 'Esconder senha' : 'Mostrar senha'} onClick={handleTogglePasswordShow}>
                    <Icon as={isPasswordShown ? IoMdEyeOff : IoMdEye} />
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>A senha está incorreta.</FormErrorMessage>
            </FormControl>
            <Link href="/">Não possui uma conta?</Link>
            <Button isDisabled={!formState.email && !formState.password} type="submit" isFullWidth>Entrar</Button>
            {formState.isFormInvalid() && (
              <Alert status="error">
                <AlertIcon />
                Algo de errado aconteceu. Tente novamente mais tarde.
              </Alert>
            )}
          </Stack>
        </div>
      </div>
    </div>
  )
}
