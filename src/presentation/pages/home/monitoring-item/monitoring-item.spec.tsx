import { render, screen } from '@testing-library/react'

import { mockDbLoadMonitoringsModel } from '@/data/tests'

import { MonitoringItem } from './monitoring-item'

const fullDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

describe('MonitoringItem Component', () => {
  it('should render with correct values', () => {
    const monitoring = mockDbLoadMonitoringsModel()
    render(<MonitoringItem monitoring={monitoring} />)
    expect(screen.getByTestId('monitor-name')).toHaveTextContent(monitoring.monitor.name)
    expect(screen.getByTestId('subject')).toHaveTextContent(monitoring.subject)
    expect(screen.getByTestId('weekday')).toHaveTextContent(fullDays[monitoring.weekday])
    expect(screen.getByTestId('period')).toHaveTextContent(`Das ${monitoring.initHour}h até ${monitoring.endHour}h`)
    expect(screen.getByTestId('room')).toHaveTextContent(monitoring.room)
  })
})
