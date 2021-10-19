import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Heading, Stack, Link, Button, AlertIcon, Alert } from '@chakra-ui/react'
import { Field, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Authentication } from '@/domain/usecases'
import { Input, PasswordInput } from '@/presentation/components'
import { validationMessages } from '@/presentation/config/yupLocale'
import logoPurpleFontImg from '@/presentation/images/logo-purple-font.png'
import logoWithProfessionalsImg from '@/presentation/images/logo-with-professionals.png'

import styles from './login-styles.scss'

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      validationMessages.passwordStrengh,
    ),
})

type FormValues = {
  email: string
  password: string
}

type Props = {
  authentication: Authentication
}

export const Login = ({ authentication }: Props): JSX.Element => {
  const onSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>): Promise<void> => {
    formikHelpers.setSubmitting(true)
    await authentication.auth(values)
    formikHelpers.setSubmitting(false)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ isSubmitting, isValid, status, dirty, submitForm }) => {
              const isDisabled = !isValid || !dirty
              const hasApiError = status === 'api-error'
              return (
                <Stack spacing={4}>
                  <img src={logoPurpleFontImg} alt="Logo Facheck" className={styles.formLogo}/>
                  <Heading as="h1">Login</Heading>
                  <Field label="Email:" name="email" leftIcon={<EmailIcon color="gray.300" />} component={Input} />
                  <Field label="Senha:" name="password" leftIcon={<LockIcon color="gray.300" />} component={PasswordInput} />
                  <Link href="/">Não possui uma conta?</Link>
                  <Button isLoading={isSubmitting} isDisabled={isDisabled} type="submit" isFullWidth onClick={submitForm} data-testid="submit">Entrar</Button>
                  {hasApiError && (
                    <Alert data-testid="error-wrap" status="error">
                      <AlertIcon />
                      Algo de errado aconteceu. Tente novamente mais tarde.
                    </Alert>
                  )}
                </Stack>
              )
            }}
          </Formik>
        </div>
        <div className={styles.imageContainer}>
          <img src={logoWithProfessionalsImg} alt="Profissionais com a logo ao fundo" />
        </div>
      </div>
    </div>
  )
}
