import { mockDbLoadMonitoringsResult } from '@/data/tests'
import { LoadMonitorings } from '@/domain/usecases'

export class LoadMonitoringsSpy implements LoadMonitorings {
  callsCount = 0
  result = mockDbLoadMonitoringsResult()

  async load(): Promise<LoadMonitorings.Result> {
    this.callsCount += 1
    return this.result
  }
}
