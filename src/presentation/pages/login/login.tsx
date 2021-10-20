import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Heading, Stack, Link as ChakraLink, Button, AlertIcon, Alert, useToast } from '@chakra-ui/react'
import { Field, Formik, FormikHelpers } from 'formik'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import { Authentication } from '@/domain/usecases'
import { Input, PasswordInput } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import logoPurpleFontImg from '@/presentation/images/logo-purple-font.png'
import logoWithProfessionalsImg from '@/presentation/images/logo-with-professionals.png'

import styles from './login-styles.scss'

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().passwordStrength(),
})

type FormValues = {
  email: string
  password: string
}

type Props = {
  authentication: Authentication
}

export const Login = ({ authentication }: Props): JSX.Element => {
  const toast = useToast()
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [mainError, setMainError] = useState('')
  const onSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const account = await authentication.auth(values)
      setCurrentAccount(account)
      toast({
        status: 'success',
        position: 'top',
        description: 'Autenticado com sucesso.',
      })
      history.replace('/')
    } catch (error) {
      formikHelpers.setSubmitting(false)
      setMainError(error.message)
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ isSubmitting, isValid, dirty, submitForm }) => {
              const isDisabled = !isValid || !dirty
              const hasMainError = !!mainError
              return (
                <Stack spacing={2}>
                  <img src={logoPurpleFontImg} alt='Logo Facheck' className={styles.formLogo} />
                  <Heading as='h1'>Login</Heading>
                  <Field
                    type='email'
                    label='Email:'
                    name='email'
                    leftIcon={<EmailIcon color='gray.300' />}
                    component={Input}
                    placeholder='Digite seu email'
                  />
                  <Field
                    label='Senha:'
                    name='password'
                    leftIcon={<LockIcon color='gray.300' />}
                    component={PasswordInput}
                    placeholder='Digite sua senha'
                  />
                  <ChakraLink as={Link} to='/signup' alignSelf='flex-start' data-testid='signup-link'>
                    Não possui uma conta?
                  </ChakraLink>
                  <Button
                    size='lg'
                    isLoading={isSubmitting}
                    isDisabled={isDisabled}
                    type='submit'
                    isFullWidth
                    onClick={submitForm}
                    data-testid='submit'
                  >
                    Entrar
                  </Button>
                  {hasMainError && (
                    <Alert data-testid='main-error' status='error'>
                      <AlertIcon />
                      {mainError}
                    </Alert>
                  )}
                </Stack>
              )
            }}
          </Formik>
        </div>
        <div className={styles.imageContainer}>
          <img src={logoWithProfessionalsImg} alt='Profissionais com a logo ao fundo' />
        </div>
      </div>
    </div>
  )
}
