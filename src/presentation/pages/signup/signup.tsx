import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Heading, Stack, Button, AlertIcon, Alert, Icon, Link as ChakraLink } from '@chakra-ui/react'
import { Field, Formik } from 'formik'
import { useState } from 'react'
import { AiFillIdcard } from 'react-icons/ai'
import { MdAccountCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

import { Input, PasswordInput } from '@/presentation/components'
import designerGirlPointingImg from '@/presentation/images/designer-girl-pointing.png'
import logoPurpleFontImg from '@/presentation/images/logo-purple-font.png'

import styles from './signup-styles.scss'

const validationSchema = yup.object().shape({
  name: yup.string().required().min(3),
  ra: yup.string().required().integer(),
  cpf: yup.string().required().cpf(),
  email: yup.string().required().email(),
  password: yup.string().required().passwordStrength(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'As senhas não batem'),
})

type FormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  ra: string
  course: string
  cpf: string
}

export const SignUp = (): JSX.Element => {
  const [mainError] = useState('')
  const onSubmit = async (values: FormValues): Promise<void> => {
    console.log('Submitted with: ', values)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={designerGirlPointingImg} alt='Garota designer apontando com um círculo roxo ao fundo' />
        </div>
        <div className={styles.formContainer}>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '', cpf: '', course: '', name: '', ra: '' }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, isValid, dirty, submitForm }) => {
              const isDisabled = !isValid || !dirty
              const hasMainError = !!mainError
              return (
                <Stack spacing={2}>
                  <img src={logoPurpleFontImg} alt='Logo Facheck' className={styles.formLogo} />
                  <Heading as='h1' textAlign='right'>
                    Cadastro do aluno
                  </Heading>
                  <Field
                    label='Nome completo:'
                    name='name'
                    leftIcon={<Icon as={MdAccountCircle} color='gray.300' />}
                    component={Input}
                    placeholder='Digite seu nome completo'
                  />
                  <Field
                    label='RA:'
                    name='ra'
                    leftIcon={<Icon as={AiFillIdcard} color='gray.300' />}
                    component={Input}
                    placeholder='Digite seu RA'
                    maxLength={13}
                  />
                  <Field
                    label='CPF:'
                    name='cpf'
                    leftIcon={<Icon as={AiFillIdcard} color='gray.300' />}
                    component={Input}
                    placeholder='Digite seu CPF'
                  />
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
                    placeholder='Digite uma senha bem forte'
                  />
                  <Field
                    label='Confirmar senha:'
                    name='confirmPassword'
                    leftIcon={<LockIcon color='gray.300' />}
                    component={PasswordInput}
                    placeholder='Repita sua senha'
                  />
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
                  <ChakraLink as={Link} to='/login' alignItems='center' textAlign='right'>
                    Já sou cadastrado
                  </ChakraLink>
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
      </div>
    </div>
  )
}
