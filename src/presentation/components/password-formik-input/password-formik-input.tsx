import { memo } from 'react'

import { PasswordInput } from '@/presentation/components'
import { withFormikHandlers } from '@/presentation/hocs'

export const PasswordFormikInput = memo(withFormikHandlers(PasswordInput))
