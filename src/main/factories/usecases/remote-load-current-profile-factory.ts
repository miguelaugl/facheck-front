import { RemoteLoadCurrentProfile } from '@/data/usecases'
import { LoadCurrentProfile } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteLoadCurrentProfile = (): LoadCurrentProfile => {
  return new RemoteLoadCurrentProfile(makeApiUrl('/me'), makeAuthorizeHttpClientDecorator())
}
