import { EmailIcon } from '@chakra-ui/icons'
import { Flex, Text, Button, Avatar, Stack, Alert, AlertIcon, Icon, Spinner, useToast } from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import { AiFillIdcard } from 'react-icons/ai'
import { IoMdSchool } from 'react-icons/io'
import { MdAccountCircle } from 'react-icons/md'
import * as yup from 'yup'

import { LoadCurrentProfile, UpdateProfile } from '@/domain/usecases'
import { FormikInput } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { AdminLayout } from '@/presentation/layouts'

type Props = {
  loadCurrentProfile: LoadCurrentProfile
  updateProfile: UpdateProfile
}

type FormValues = {
  name: string
  email: string
  ra: string
  course: string
  cpf: string
}

const validationSchema = yup.object().shape({
  name: yup.string().required().min(3),
  course: yup.string().required().min(3),
  ra: yup.string().required().integer().length(13),
  cpf: yup.string().required().cpf(),
  email: yup.string().required().email(),
})

export const Profile = ({ loadCurrentProfile, updateProfile }: Props): JSX.Element => {
  const [state, setState] = useState({
    error: '',
    mainError: '',
    profile: {} as LoadCurrentProfile.Result,
    reload: false,
    loading: true,
  })
  const handleError = useErrorHandler((error) => {
    toast({
      status: 'error',
      position: 'top',
      description: error.message,
    })
    setState((old) => ({ ...old, mainError: error.message }))
  })
  const toast = useToast()
  useEffect(() => {
    loadCurrentProfile
      .load()
      .then((profile) => {
        setState((old) => ({ ...old, profile, loading: false }))
      })
      .catch(handleError)
  }, [state.reload])
  const handleReload = (): void => {
    setState((prevState) => ({ ...prevState, reload: !prevState.reload, error: '' }))
  }
  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const profile = await updateProfile.update(values)
      setState((old) => ({ ...old, profile, error: '' }))
      toast({
        status: 'success',
        position: 'top',
        description: 'Perfil atualizado com sucesso!',
      })
    } catch (error) {
      handleError(error)
    } finally {
      setSubmitting(false)
    }
  }
  const { profile } = state
  const initialValues: FormValues = { name: profile.name, email: profile.email, course: profile.course, cpf: profile.cpf, ra: profile.ra }
  return (
    <AdminLayout>
      {!!state.error && (
        <Flex align='center' justify='center' direction='column' py='8'>
          <Text fontWeight='medium' fontSize='xl' data-testid='error' mb='4'>
            {state.error}
          </Text>
          <Button data-testid='reload' onClick={handleReload}>
            Tentar novamente
          </Button>
        </Flex>
      )}
      {state.loading && <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
      {!state.loading && (
        <Flex width={{ base: '100%', md: '50%' }} margin='auto' flexDirection='column' alignItems='center'>
          <Avatar size='2xl' name={profile.name} mb='4' color='white' bg='blue.400' margin='0 auto 32px' />
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ isSubmitting, isValid, dirty }) => {
              const isDisabled = !isValid || !dirty
              const hasMainError = !!state.mainError
              return (
                <Stack as={Form} spacing={2} width='100%'>
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
                    mask='onlyDigits'
                  />
                  <Field
                    label='CPF:'
                    name='cpf'
                    leftIcon={<Icon as={AiFillIdcard} color='gray.300' />}
                    component={FormikInput}
                    placeholder='Digite seu CPF'
                    maxLength={14}
                    mask='cpf'
                  />
                  <Field
                    type='email'
                    label='Email:'
                    name='email'
                    leftIcon={<EmailIcon color='gray.300' />}
                    component={FormikInput}
                    placeholder='Digite seu email'
                  />
                  <Button size='lg' isLoading={isSubmitting} isDisabled={isDisabled} type='submit' isFullWidth data-testid='submit'>
                    Atualizar
                  </Button>
                  {hasMainError && (
                    <Alert data-testid='main-error' status='error'>
                      <AlertIcon />
                      {state.mainError}
                    </Alert>
                  )}
                </Stack>
              )
            }}
          </Formik>
        </Flex>
      )}
    </AdminLayout>
  )
}
