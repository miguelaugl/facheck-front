import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'

type ReturnType = () => void

export const useLogout = (): ReturnType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  return (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }
}
