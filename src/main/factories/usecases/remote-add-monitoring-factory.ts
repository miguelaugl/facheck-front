import { RemoteAddMonitoring } from '@/data/usecases/remote-add-monitoring'
import { AddMonitoring } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteAddMonitoring = (): AddMonitoring => {
  return new RemoteAddMonitoring(makeApiUrl('/monitorings'), makeAuthorizeHttpClientDecorator())
}
