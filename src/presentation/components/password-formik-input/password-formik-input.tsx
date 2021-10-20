import { memo } from 'react'

import { PasswordInput } from '@/presentation/components'
import { withFormikHandlers } from '@/presentation/hocs/with-formik-handlers/with-formik-handlers'

export const PasswordFormikInput = memo(withFormikHandlers(PasswordInput))
