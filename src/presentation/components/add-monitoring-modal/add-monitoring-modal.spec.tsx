import { render, screen } from '@testing-library/react'

import { AddMonitoringModal } from './add-monitoring-modal'

describe('AddMonitoringModal Component', () => {
  it('should start with correct initial state', () => {
    const onClose = jest.fn()
    render(<AddMonitoringModal isOpen onClose={onClose} />)
    expect(screen.getByText(/adicionar$/i)).toBeDisabled()
    expect(screen.getByTestId('subject')).not.toHaveValue()
    const weekdayBtns = screen.getAllByTestId('weekday-btn')
    weekdayBtns.forEach((weekdayBtn) => {
      expect(weekdayBtn).not.toHaveClass('selected')
    })
    expect(screen.getByTestId('initHour')).not.toHaveValue()
    expect(screen.getByTestId('endHour')).not.toHaveValue()
  })
})
