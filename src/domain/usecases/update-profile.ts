import { ProfileModel } from '@/domain/models'

export interface UpdateProfile {
  update: (data: UpdateProfile.Params) => Promise<UpdateProfile.Result>
}

export namespace UpdateProfile {
  export type Params = {
    name?: string
    email?: string
    ra?: string
    course?: string
    cpf?: string
  }
  export type Result = ProfileModel
}
