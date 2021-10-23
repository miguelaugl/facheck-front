import { FieldInputProps, FormikProps } from 'formik'
import { useCallback, MouseEvent } from 'react'

import { Weekday } from '@/domain/models'
import { WeekdaySelectorProps, WeekdaySelector } from '@/presentation/components'
import { getFormikFieldError } from '@/presentation/helpers'

type FormikWeekdaySelectorProps = WeekdaySelectorProps & {
  field: FieldInputProps<any>
  form: FormikProps<any>
}

export const FormikWeekdaySelector = ({ field, form, ...props }: FormikWeekdaySelectorProps): JSX.Element => {
  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>, value: Weekday): void => {
    form.setFieldValue(field.name, value)
  }, [])
  const errorMessage = getFormikFieldError(field.name, form)
  return <WeekdaySelector {...props} onClick={onClick} value={field.value} errorMessage={errorMessage} />
}
