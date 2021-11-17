import { ProfileModel } from '@/domain/models'

export interface LoadCurrentProfile {
  load: () => Promise<LoadCurrentProfile.Result>
}

export namespace LoadCurrentProfile {
  export type Result = ProfileModel
}
