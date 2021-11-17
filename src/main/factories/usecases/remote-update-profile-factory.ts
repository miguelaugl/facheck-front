import { RemoteUpdateProfile } from '@/data/usecases'
import { UpdateProfile } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'

export const makeRemoteUpdateProfile = (): UpdateProfile => {
  return new RemoteUpdateProfile(makeApiUrl('/me'), makeAuthorizeHttpClientDecorator())
}
