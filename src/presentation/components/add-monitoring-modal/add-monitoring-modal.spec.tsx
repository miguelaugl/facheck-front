import { fireEvent, render, screen } from '@testing-library/react'
import faker from 'faker'

import { validationMessages } from '@/presentation/config/yup'

import { AddMonitoringModal } from './add-monitoring-modal'

const makeSut = (): void => {
  const onClose = jest.fn()
  render(<AddMonitoringModal isOpen onClose={onClose} />)
}

describe('AddMonitoringModal Component', () => {
  it('should start with correct initial state', () => {
    makeSut()
    expect(screen.getByText(/adicionar$/i)).toBeDisabled()
    expect(screen.getByTestId('subject')).not.toHaveValue()
    const weekdayBtns = screen.getAllByTestId('weekday-btn')
    weekdayBtns.forEach((weekdayBtn) => {
      expect(weekdayBtn).not.toHaveClass('selected')
    })
    expect(screen.getByTestId('initHour')).not.toHaveValue()
    expect(screen.getByTestId('endHour')).not.toHaveValue()
  })

  it('should show subject validation error', async () => {
    makeSut()
    const subjectInput = screen.getByTestId('subject')
    fireEvent.blur(subjectInput)
    expect(await screen.findByTestId('subject-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
  })

  it('should show initHour validation error', async () => {
    makeSut()
    const initHourInput = screen.getByTestId('initHour')
    fireEvent.blur(initHourInput)
    expect(await screen.findByTestId('initHour-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    fireEvent.input(initHourInput, { target: { value: '32:40' } })
    expect(await screen.findByTestId('initHour-error-message')).toHaveTextContent(validationMessages.militaryTime)
  })

  it('should show endHour validation error', async () => {
    makeSut()
    const endHourInput = screen.getByTestId('endHour')
    fireEvent.blur(endHourInput)
    expect(await screen.findByTestId('endHour-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    fireEvent.input(endHourInput, { target: { value: '32:40' } })
    expect(await screen.findByTestId('endHour-error-message')).toHaveTextContent(validationMessages.militaryTime)
  })

  it('should show room validation error', async () => {
    makeSut()
    const roomInput = screen.getByTestId('room')
    fireEvent.blur(roomInput)
    expect(await screen.findByTestId('room-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
    const roomMaxLength = '50'
    const maxLengthMessage = (validationMessages.string.max as string).replace(/\${max}/, roomMaxLength)
    fireEvent.input(roomInput, { target: { value: faker.lorem.lines(10) } })
    expect(await screen.findByTestId('room-error-message')).toHaveTextContent(maxLengthMessage)
  })
})
