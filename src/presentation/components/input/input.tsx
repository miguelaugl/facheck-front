import {
  Input as ChakraInput,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  ChakraProps,
} from '@chakra-ui/react'
import React, { ChangeEventHandler, memo, HTMLInputTypeAttribute, FocusEventHandler } from 'react'

export type InputProps = {
  /**
   * defauls to text
   */
  type?: HTMLInputTypeAttribute
  id?: string
  label?: string
  placeholder?: string
  name?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  /**
   * defauls to Inválido
   */
  errorMessage?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
  isDisabled?: boolean
  isInvalid?: boolean
  maxLength?: number
  isTouched?: boolean
} & ChakraProps

const InputComponent = ({
  id,
  label,
  name,
  helperText,
  value,
  onChange,
  onBlur,
  leftIcon,
  rightElement,
  placeholder,
  type = 'text',
  errorMessage = 'Inválido',
  isDisabled,
  isInvalid,
  isTouched,
  maxLength,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <FormControl isDisabled={isDisabled} isInvalid={isInvalid}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
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
          onChange={onChange}
          onBlur={onBlur}
          maxLength={maxLength}
          {...rest}
        />
        {rightElement}
      </InputGroup>
      {!isInvalid && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage data-testid={`${name}-error-message`}>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}

export const Input = memo(InputComponent)
