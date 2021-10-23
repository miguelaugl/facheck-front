import { createContext } from 'react'

import { AddMonitoring } from '@/domain/usecases'

type Props = {
  addMonitoring: AddMonitoring
}

export const UseCasesContext = createContext<Props>(null)
