import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Heading, Stack, Link, Button, AlertIcon, Alert } from '@chakra-ui/react'
import { Field, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Input, PasswordInput } from '@/presentation/components'

import styles from './styles.module.css'

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Deve conter 8 caracteres, uma letra maiúscula, uma letra minúsculo, um número e um caractere especial',
    ),
})

type FormValues = {
  email: string
  password: string
}

export const Login = (): JSX.Element => {
  const onSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>): void => {
    console.log('Submitted with:', values)
    setTimeout(formikHelpers.setSubmitting, 3000, false)
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
                    <Heading as="h1">Logar-se</Heading>
                    <Field label="Email:" name="email" leftIcon={<EmailIcon color="gray.300" />} component={Input} />
                    <Field label="Senha:" name="password" leftIcon={<LockIcon color="gray.300" />} component={PasswordInput} />
                    <Link href="/">Não possui uma conta?</Link>
                    <Button isLoading={isSubmitting} isDisabled={isDisabled} type="submit" isFullWidth onClick={submitForm}>Entrar</Button>
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
