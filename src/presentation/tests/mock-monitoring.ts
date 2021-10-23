import { mockDbLoadMonitoringsResult } from '@/data/tests'
import { AddMonitoring, LoadMonitorings } from '@/domain/usecases'

export class LoadMonitoringsSpy implements LoadMonitorings {
  callsCount = 0
  result = mockDbLoadMonitoringsResult()

  async load(): Promise<LoadMonitorings.Result> {
    this.callsCount += 1
    return this.result
  }
}

export class AddMonitoringSpy implements AddMonitoring {
  params: AddMonitoring.Params

  async add(params: AddMonitoring.Params): Promise<void> {
    this.params = params
  }
}
