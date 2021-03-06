/* eslint-disable @typescript-eslint/indent */
import { FieldInputProps, FormikProps } from 'formik'
import React, { ChangeEvent, FocusEvent, useCallback } from 'react'

import { InputProps } from '@/presentation/components'
import { getFormikFieldError } from '@/presentation/helpers'
import { Mask, useMask } from '@/presentation/hooks'

type FormikInputProps = InputProps & {
  field: FieldInputProps<any>
  form: FormikProps<any>
  mask?: Mask
}

export const withFormikHandlers =
  (Input: React.ComponentType<InputProps>) =>
  ({ field, form, mask, ...props }: FormikInputProps) => {
    const { clean: maskClean, maskedValue } = useMask(mask, field.value)
    const onChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>): void => {
        form.setFieldValue(field.name, maskClean(e.target.value))
      },
      [form, field],
    )
    const onBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>): void => {
        form.setFieldTouched(field.name, true)
        form.setFieldValue(field.name, maskClean(e.target.value))
      },
      [form, field],
    )
    const errorMessage = getFormikFieldError(field.name, form)
    return (
      <Input
        {...props}
        name={field.name}
        value={maskedValue}
        onChange={onChange}
        onBlur={onBlur}
        errorMessage={errorMessage}
        isInvalid={!!errorMessage}
        isTouched={!!form.touched[field.name]}
      />
    )
  }
