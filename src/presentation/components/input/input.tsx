import { Input as ChakraInput, FormLabel, InputGroup, InputLeftElement, FormControl, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
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
  isFullWidth?: boolean
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
}

const InputComponent = ({
  id,
  field,
  form,
  label,
  name: nameProp,
  helperText,
  isFullWidth = true,
  value: valueProp,
  onChange,
  leftIcon,
  rightElement,
  placeholder,
  type = 'text',
  isDisabled,
}: Props): JSX.Element => {
  console.log(form)
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
  const isFormInvalid = !!errorMessage
  const shouldShowValidFieldFeedback = !rightElement && !errorMessage && !!form?.touched[name]
  return (
    <FormControl isDisabled={isDisabled} isInvalid={isFormInvalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
      {leftIcon && (
        <InputLeftElement
          pointerEvents="none"
        >
          {leftIcon}
        </InputLeftElement>
      )}
        <ChakraInput
          id={id || name}
          name={name}
          type={type}
          value={value}
          focusBorderColor="purple.500"
          placeholder={placeholder}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          isFullWidth={isFullWidth}
        />
        {rightElement}
        <ValidFeedbackIcon shouldShow={shouldShowValidFieldFeedback} />
     </InputGroup>
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}

export const Input = memo(InputComponent)
