/* eslint-disable @typescript-eslint/indent */
import { FieldInputProps, FormikProps } from 'formik'
import React, { ChangeEvent, FocusEvent, useCallback } from 'react'

import { InputProps } from '@/presentation/components'

type FormikInputProps = InputProps & {
  field: FieldInputProps<any>
  form: FormikProps<any>
}

export const withFormikHandlers =
  (Input: React.ComponentType<InputProps>) =>
  ({ field, form, ...props }: FormikInputProps) => {
    const onChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>): void => {
        form.setFieldValue(field.name, e.target.value)
      },
      [form, field],
    )
    const onBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>): void => {
        form.setFieldTouched(field.name, true)
        form.setFieldValue(field.name, e.target.value)
      },
      [form, field],
    )
    const getFieldError = (name: string, form: FormikProps<any>): string => {
      return form.touched[name] || form.submitCount ? form.getFieldMeta(name).error : ''
    }
    const errorMessage = form && getFieldError(field.name, form)
    return (
      <Input
        {...props}
        name={field.name}
        onChange={onChange}
        onBlur={onBlur}
        errorMessage={errorMessage}
        isInvalid={!!errorMessage}
        isTouched={!!form.touched[field.name]}
      />
    )
  }
