import { makeRemoteLoadMonitorings } from '@/main/factories/usecases'
import { Home } from '@/presentation/pages'

export const makeHome = (): JSX.Element => {
  return <Home loadMonitorings={makeRemoteLoadMonitorings()} />
}
