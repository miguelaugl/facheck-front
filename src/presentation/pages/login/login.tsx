import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Heading, Stack, Link, Button, AlertIcon, Alert } from '@chakra-ui/react'
import { Field, Formik } from 'formik'

import { Input, PasswordInput } from '@/presentation/components'

import styles from './styles.module.css'

export const Login = (): JSX.Element => {
  const onSubmit = (): void => {
    console.log('submitted')
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
            <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
              {({ isSubmitting, isValid, status, dirty }) => {
                const isDisabled = !isValid || !dirty
                const hasApiError = status === 'api-error'
                return (
                  <Stack as="form" spacing={4}>
                    <Heading as="h1">Logar-se</Heading>
                    <Field label="Email:" name="email" leftIcon={<EmailIcon color="gray.300" />} component={Input} />
                    <Field label="Senha:" name="password" leftIcon={<LockIcon color="gray.300" />} component={PasswordInput} />
                    <Link href="/">Não possui uma conta?</Link>
                    <Button isLoading={isSubmitting} isDisabled={isDisabled} type="submit" isFullWidth>Entrar</Button>
                    {hasApiError && (
                      <Alert status="error">
                        <AlertIcon />
                        Algo de errado aconteceu. Tente novamente mais tarde.
                      </Alert>
                    )}
                  </Stack>
                )
              }}
            </Formik>
        </div>
      </div>
    </div>
  )
}
