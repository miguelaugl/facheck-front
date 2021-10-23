import { fireEvent, render, screen, waitFor } from '@testing-library/react'

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
    await waitFor(() => {
      fireEvent.blur(subjectInput)
    })
    expect(await screen.findByTestId('subject-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
  })
})
