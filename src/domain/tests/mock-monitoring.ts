import { MonitoringModel, Weekday } from '@/domain/models'

export const mockMonitoringModel = (): MonitoringModel => ({
  id: 'any_id',
  monitorId: 'any_monitor_id',
  weekday: Weekday.FRIDAY,
  subject: 'any_subject',
  initHour: '15:00',
  endHour: '16:00',
  room: 'Lab - 15',
})

export const mockMonitoringModels = (): MonitoringModel[] => [
  mockMonitoringModel(),
  {
    id: 'other_id',
    monitorId: 'other_monitor_id',
    subject: 'other_subject',
    weekday: Weekday.MONDAY,
    initHour: '15:00',
    endHour: '16:00',
    room: 'Quadra - 23',
  },
]
