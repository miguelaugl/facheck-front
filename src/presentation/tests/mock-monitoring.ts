import { LoadMonitorings } from '@/domain/usecases'

export class LoadMonitoringsSpy implements LoadMonitorings {
  callsCount = 0

  async load(): Promise<LoadMonitorings.Result> {
    this.callsCount += 1
    return null
  }
}
