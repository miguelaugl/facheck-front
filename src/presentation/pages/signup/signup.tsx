import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Heading, Stack, Button, AlertIcon, Alert, Icon, Link as ChakraLink, useToast } from '@chakra-ui/react'
import { Field, Formik, FormikHelpers } from 'formik'
import { useContext, useState } from 'react'
import { AiFillIdcard } from 'react-icons/ai'
import { IoMdSchool } from 'react-icons/io'
import { MdAccountCircle } from 'react-icons/md'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'

import { AddAccount } from '@/domain/usecases'
import { PasswordFormikInput, FormikInput } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import designerGirlPointingImg from '@/presentation/images/designer-girl-pointing.png'
import logoPurpleFontImg from '@/presentation/images/logo-purple-font.png'

import styles from './signup-styles.scss'

const validationSchema = yup.object().shape({
  name: yup.string().required().min(3),
  course: yup.string().required().min(3),
  ra: yup.string().required().integer().length(13),
  cpf: yup.string().required().cpf(),
  email: yup.string().required().email(),
  password: yup.string().required().passwordStrength(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'As senhas não batem.'),
})

type FormValues = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  ra: string
  course: string
  cpf: string
}

type Props = {
  addAccount: AddAccount
}

export const SignUp = ({ addAccount }: Props): JSX.Element => {
  const toast = useToast()
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [mainError, setMainError] = useState('')
  const onSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const account = await addAccount.add(values)
      setCurrentAccount(account)
      toast({
        status: 'success',
        position: 'top',
        description: `Autenticado como ${account.name}.`,
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
        <div className={styles.imageContainer}>
          <img src={designerGirlPointingImg} alt='Garota designer apontando com um círculo roxo ao fundo' />
        </div>
        <div className={styles.formContainer}>
          <Formik
            initialValues={{ email: '', password: '', passwordConfirmation: '', cpf: '', course: '', name: '', ra: '' }}
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
                    component={FormikInput}
                    placeholder='Digite seu nome completo'
                  />
                  <Field
                    label='Qual curso você está?:'
                    name='course'
                    leftIcon={<Icon as={IoMdSchool} color='gray.300' />}
                    component={FormikInput}
                    placeholder='Digite o curso que você faz parte'
                  />
                  <Field
                    label='RA:'
                    name='ra'
                    leftIcon={<Icon as={AiFillIdcard} color='gray.300' />}
                    component={FormikInput}
                    placeholder='Digite seu RA'
                    maxLength={13}
                  />
                  <Field
                    label='CPF:'
                    name='cpf'
                    leftIcon={<Icon as={AiFillIdcard} color='gray.300' />}
                    component={FormikInput}
                    placeholder='Digite seu CPF'
                    maxLength={14}
                  />
                  <Field
                    type='email'
                    label='Email:'
                    name='email'
                    leftIcon={<EmailIcon color='gray.300' />}
                    component={FormikInput}
                    placeholder='Digite seu email'
                  />
                  <Field
                    label='Senha:'
                    name='password'
                    leftIcon={<LockIcon color='gray.300' />}
                    component={PasswordFormikInput}
                    placeholder='Digite uma senha bem forte'
                  />
                  <Field
                    label='Confirmar senha:'
                    name='passwordConfirmation'
                    leftIcon={<LockIcon color='gray.300' />}
                    component={PasswordFormikInput}
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
                  <ChakraLink as={Link} to='/login' alignItems='center' textAlign='right' data-testid='login-link'>
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
