import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button, HStack, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'

import { Weekday } from '@/domain/models'
import { FormikInput, FormikWeekdaySelector } from '@/presentation/components'

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

export const AddMonitoringModal = ({ isOpen, onClose }: Props): JSX.Element => {
  const toast = useToast()
  const onSubmit = async (values: FormValues): Promise<void> => {
    console.log('Submitted with values: ', values)
    toast({
      status: 'success',
      position: 'top',
      description: 'Monitoria criado com sucesso.',
    })
  }
  const handleClose = (resetForm: () => void): void => {
    onClose()
    resetForm()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik initialValues={{ subject: '', weekday: null, initHour: '', endHour: '', room: '' }} onSubmit={onSubmit}>
        {({ resetForm, isSubmitting }) => (
          <Form>
            <ModalContent>
              <ModalHeader>Adicionar nova monitoria</ModalHeader>
              <ModalCloseButton top='3' />
              <ModalBody pb='6'>
                <Field name='subject' label='Matéria:' component={FormikInput} />
                <Field name='weekday' component={FormikWeekdaySelector} />
                <HStack spacing='3'>
                  <Field name='initHour' label='Início:' helperText='Formato hh:mm' component={FormikInput} />
                  <Field name='endHour' label='Final:' helperText='Formato hh:mm' component={FormikInput} />
                </HStack>
              </ModalBody>
              <ModalFooter>
                <Button variant='ghost' onClick={() => handleClose(resetForm)} mr='3'>
                  Cancelar
                </Button>
                <Button type='submit' isLoading={isSubmitting}>
                  Adicionar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
