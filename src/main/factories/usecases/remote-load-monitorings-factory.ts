import { RemoteLoadMonitorings } from '@/data/usecases'
import { LoadMonitorings } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteLoadMonitorings = (): LoadMonitorings => {
  return new RemoteLoadMonitorings(makeApiUrl('/monitorings'), makeAuthorizeHttpClientDecorator())
}
