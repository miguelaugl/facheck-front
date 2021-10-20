import { Input as ChakraInput, FormLabel, InputGroup, InputLeftElement, FormControl, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import { FormikProps, FieldInputProps } from 'formik'
import React, { ChangeEventHandler, useCallback, memo, HTMLInputTypeAttribute, ChangeEvent } from 'react'

import { ValidFeedbackIcon } from './valid-feedback-icon'

export type Props = {
  field?: FieldInputProps<any>
  form?: FormikProps<any>
  /**
   * defauls to text
   */
  type?: HTMLInputTypeAttribute
  /**
   * defauls to true
   */
  id?: string
  label: string
  placeholder?: string
  name: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  helperText?: string
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
  isDisabled?: boolean
  maxLength?: number
}

const InputComponent = ({
  id,
  field,
  form,
  label,
  name: nameProp,
  helperText,
  value: valueProp,
  onChange,
  leftIcon,
  rightElement,
  placeholder,
  type = 'text',
  isDisabled,
  maxLength,
}: Props): JSX.Element => {
  const name = field?.name ?? nameProp
  const value = field?.value ?? valueProp
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      form?.setFieldValue(name, e.target.value)
      onChange?.(e)
    },
    [form, name, onChange],
  )
  const onBlurHandler = useCallback(
    (e): void => {
      form?.setFieldTouched(name, true)
      form?.setFieldValue(name, e.target.value)
    },
    [form, name],
  )
  const getFieldError = (name: string, form: FormikProps<any>): string => {
    return form.touched[name] || form.submitCount ? form.getFieldMeta(name).error : ''
  }
  const errorMessage = form && getFieldError(name, form)
  const isFieldInvalid = !!errorMessage
  const shouldShowValidFieldFeedback = !rightElement && !errorMessage && !!form?.touched[name]
  return (
    <FormControl isDisabled={isDisabled} isInvalid={isFieldInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        {leftIcon && <InputLeftElement pointerEvents='none'>{leftIcon}</InputLeftElement>}
        <ChakraInput
          id={id || name}
          name={name}
          type={type}
          data-testid={name}
          value={value}
          bgColor='white'
          focusBorderColor='purple.500'
          placeholder={placeholder}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          maxLength={maxLength}
        />
        {rightElement}
        <ValidFeedbackIcon shouldShow={shouldShowValidFieldFeedback} />
      </InputGroup>
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage data-testid={`${name}-error-message`}>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}

export const Input = memo(InputComponent)
