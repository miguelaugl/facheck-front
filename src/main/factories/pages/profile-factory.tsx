import { makeRemoteLoadCurrentProfile, makeRemoteUpdateProfile } from '@/main/factories/usecases'
import { Profile } from '@/presentation/pages'

export const makeProfile = (): JSX.Element => {
  return <Profile loadCurrentProfile={makeRemoteLoadCurrentProfile()} updateProfile={makeRemoteUpdateProfile()} />
}
