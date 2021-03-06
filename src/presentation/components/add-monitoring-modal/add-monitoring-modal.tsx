import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  HStack,
  useToast,
  Stack,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useContext } from 'react'
import * as yup from 'yup'

import { Weekday } from '@/domain/models'
import { FormikInput, FormikWeekdaySelector } from '@/presentation/components'
import { ApiContext, UseCasesContext } from '@/presentation/contexts'
import { eventEmitter, Events } from '@/presentation/event-emitter'
import { useErrorHandler } from '@/presentation/hooks'

type FormValues = {
  subject: string
  weekday: Weekday.MONDAY
  initHour: string
  endHour: string
  room: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
}

const validationSchema = yup.object().shape({
  subject: yup.string().required(),
  weekday: yup.number().required(),
  initHour: yup.string().required().militaryTime().length(5),
  endHour: yup.string().required().militaryTime().length(5),
  room: yup.string().required().max(50),
})

export const AddMonitoringModal = ({ isOpen, onClose }: Props): JSX.Element => {
  const handleError = useErrorHandler((error) => {
    toast({
      status: 'error',
      position: 'top',
      description: error.message,
    })
  })
  const { addMonitoring } = useContext(UseCasesContext)
  const { getCurrentAccount } = useContext(ApiContext)
  const toast = useToast()
  const onSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const account = getCurrentAccount()
      const addMonitoringParams = {
        ...values,
        monitorId: account.id,
      }
      await addMonitoring.add(addMonitoringParams)
      eventEmitter.emit(Events.ADD_MONITORING)
      toast({
        status: 'success',
        position: 'top',
        description: 'Monitoria criada com sucesso.',
      })
      onClose()
      resetForm()
    } catch (error) {
      handleError(error)
    }
  }
  const handleClose = (resetForm: () => void): void => {
    onClose()
    resetForm()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={{ subject: '', weekday: null, initHour: '', endHour: '', room: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ resetForm, isSubmitting, isValid, dirty }) => {
          const isDisabled = !isValid || !dirty
          return (
            <Form>
              <ModalContent>
                <ModalHeader>Adicionar nova monitoria</ModalHeader>
                <ModalCloseButton top='3' />
                <Stack as={ModalBody} pb='6'>
                  <Field name='subject' label='Mat??ria:' component={FormikInput} />
                  <Field name='weekday' component={FormikWeekdaySelector} />
                  <HStack spacing='3' align='flex-start'>
                    <Field name='initHour' label='In??cio:' helperText='Formato hh:mm' mask='militaryTime' maxLength={5} component={FormikInput} />
                    <Field name='endHour' label='Final:' helperText='Formato hh:mm' mask='militaryTime' maxLength={5} component={FormikInput} />
                  </HStack>
                  <Field name='room' label='Local:' component={FormikInput} maxLength={50} />
                </Stack>
                <ModalFooter>
                  <Button variant='ghost' onClick={() => handleClose(resetForm)} mr='3'>
                    Cancelar
                  </Button>
                  <Button type='submit' isLoading={isSubmitting} isDisabled={isDisabled}>
                    Adicionar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}
