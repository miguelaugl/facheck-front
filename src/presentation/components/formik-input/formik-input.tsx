import { CheckCircleIcon } from '@chakra-ui/icons'
import { InputRightElement, ScaleFade, Tooltip } from '@chakra-ui/react'
import { memo } from 'react'

import { Input, InputProps } from '@/presentation/components'
import { withFormikHandlers } from '@/presentation/hocs/with-formik-handlers/with-formik-handlers'

const FormikInputComponent = (props: InputProps): JSX.Element => {
  const shouldShowValidFieldFeedback = !props.isInvalid && props.isTouched
  const isTooltipDisabled = !shouldShowValidFieldFeedback
  return (
    <Input
      {...props}
      rightElement={
        <ScaleFade initialScale={0.9} in={shouldShowValidFieldFeedback}>
          <Tooltip label='Tudo certo!' placement='top' isDisabled={isTooltipDisabled}>
            <InputRightElement>
              <CheckCircleIcon color='green.300' />
            </InputRightElement>
          </Tooltip>
        </ScaleFade>
      }
    />
  )
}

export const FormikInput = memo(withFormikHandlers(FormikInputComponent))
