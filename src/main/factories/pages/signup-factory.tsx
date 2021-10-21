import { makeRemoteAddAccount } from '@/main/factories/usecases'
import { SignUp } from '@/presentation/pages'

export const makeSignUp = (): JSX.Element => {
  return <SignUp addAccount={makeRemoteAddAccount()} />
}
