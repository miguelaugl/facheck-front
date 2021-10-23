import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { mockAccountModel, mockAddMonitoringParams } from '@/domain/tests'
import { validationMessages } from '@/presentation/config/yup'
import { ApiContext, UseCasesContext } from '@/presentation/contexts'
import { AddMonitoringSpy, simulateFieldInteraction } from '@/presentation/tests'

import { AddMonitoringModal } from './add-monitoring-modal'

type SutTypes = {
  addMonitoringSpy: AddMonitoringSpy
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const addMonitoringSpy = new AddMonitoringSpy()
  const onClose = jest.fn()
  render(
    <UseCasesContext.Provider value={{ addMonitoring: addMonitoringSpy }}>
      <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
        <AddMonitoringModal isOpen onClose={onClose} />
      </ApiContext.Provider>
    </UseCasesContext.Provider>,
  )
  return {
    addMonitoringSpy,
  }
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
    expect(screen.getByTestId('subject-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
  })

  it('should show initHour required validation error', async () => {
    makeSut()
    const initHourInput = screen.getByTestId('initHour')
    await waitFor(() => {
      fireEvent.blur(initHourInput)
    })
    expect(screen.getByTestId('initHour-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
  })

  it('should show endHour required validation error', async () => {
    makeSut()
    const endHourInput = screen.getByTestId('endHour')
    await waitFor(() => {
      fireEvent.blur(endHourInput)
    })
    expect(screen.getByTestId('endHour-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
  })

  it('should show room validation error', async () => {
    makeSut()
    const roomInput = screen.getByTestId('room')
    await waitFor(() => {
      fireEvent.blur(roomInput)
    })
    expect(screen.getByTestId('room-error-message')).toHaveTextContent(validationMessages.mixed.required as string)
  })

  it('should call AddMonitoring with correct values', async () => {
    const addMonitoringParams = mockAddMonitoringParams()
    const { addMonitoringSpy } = makeSut({
      ...mockAccountModel(),
      id: addMonitoringParams.monitorId,
    })
    await simulateFieldInteraction('subject', addMonitoringParams.subject)
    await simulateFieldInteraction('initHour', addMonitoringParams.initHour)
    await simulateFieldInteraction('endHour', addMonitoringParams.endHour)
    await simulateFieldInteraction('room', addMonitoringParams.room)
    const weekdayBtns = screen.getAllByTestId('weekday-btn')
    await waitFor(() => {
      fireEvent.click(weekdayBtns[addMonitoringParams.weekday])
    })
    act(() => {
      fireEvent.click(screen.getByText(/adicionar$/i))
    })
    await waitFor(() => addMonitoringSpy.add)
    expect(addMonitoringSpy.params).toEqual(addMonitoringParams)
  })

  it('should not call AddMonitoring if form is invalid', async () => {
    const { addMonitoringSpy } = makeSut()
    const addMonitoringParams = mockAddMonitoringParams()
    await simulateFieldInteraction('subject', addMonitoringParams.subject)
    await simulateFieldInteraction('initHour', addMonitoringParams.initHour)
    await simulateFieldInteraction('endHour', addMonitoringParams.endHour)
    await simulateFieldInteraction('room', addMonitoringParams.room)
    act(() => {
      fireEvent.click(screen.getByText(/adicionar$/i))
    })
    expect(addMonitoringSpy.callsCount).toEqual(0)
  })

  it('should call AddMonitoring only once', async () => {
    const { addMonitoringSpy } = makeSut()
    const addMonitoringParams = mockAddMonitoringParams()
    await simulateFieldInteraction('subject', addMonitoringParams.subject)
    await simulateFieldInteraction('initHour', addMonitoringParams.initHour)
    await simulateFieldInteraction('endHour', addMonitoringParams.endHour)
    await simulateFieldInteraction('room', addMonitoringParams.room)
    const weekdayBtns = screen.getAllByTestId('weekday-btn')
    await waitFor(() => {
      fireEvent.click(weekdayBtns[addMonitoringParams.weekday])
    })
    const submitBtn = screen.getByText(/adicionar$/i)
    act(() => {
      fireEvent.click(submitBtn)
    })
    act(() => {
      fireEvent.click(submitBtn)
    })
    await waitFor(() => addMonitoringSpy.add)
    expect(addMonitoringSpy.callsCount).toEqual(1)
  })
})
