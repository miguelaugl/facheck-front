import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { Login } from '@/presentation/pages'

export const makeLogin = (): JSX.Element => {
  return <Login authentication={makeRemoteAuthentication()} />
}
