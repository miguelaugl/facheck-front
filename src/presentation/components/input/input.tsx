import { Input as ChakraInput, FormLabel, InputGroup, InputLeftElement, FormControl, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import { FormikProps } from 'formik'
import React, { ChangeEventHandler, useCallback, memo, HTMLInputTypeAttribute, ChangeEvent } from 'react'

export type Props = {
  form: FormikProps<any>
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
  form,
  label,
  name,
  helperText,
  isFullWidth = true,
  value,
  onChange,
  leftIcon,
  rightElement,
  placeholder,
  type = 'text',
  isDisabled,
}: Props): JSX.Element => {
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      form?.setFieldValue(name, e.target.value)
      onChange?.(e)
    },
    [form, onChange],
  )
  const onBlurHandler = useCallback(
    (e): void => {
      form?.setFieldTouched(name, true)
      form?.setFieldValue(name, e.target.value)
    },
    [form],
  )
  const getFieldError = (name: string, form: FormikProps<any>): string => {
    return form.touched[name] || form.submitCount ? form.getFieldMeta(name).error : ''
  }
  const errorMessage = form && getFieldError(name, form)
  const isFormInvalid = !!errorMessage
  return (
    <FormControl isDisabled={isDisabled} isInvalid={isFormInvalid}>
      <FormLabel htmlFor={name}>{label}:</FormLabel>
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
     </InputGroup>
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}

export const Input = memo(InputComponent)
