import { HStack, Button, Tooltip, FormLabel, FormControl, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import { MouseEvent } from 'react'

import { Weekday } from '@/domain/models'

type Option = {
  label: string
  fullLabel: string
  value: Weekday
}

const options: Option[] = [
  {
    label: 'D',
    fullLabel: 'Domingo',
    value: Weekday.SUNDAY,
  },
  {
    label: 'S',
    fullLabel: 'Segunda',
    value: Weekday.MONDAY,
  },
  {
    label: 'T',
    fullLabel: 'Terça',
    value: Weekday.TUESDAY,
  },
  {
    label: 'Q',
    fullLabel: 'Quarta',
    value: Weekday.WEDNESDAY,
  },
  {
    label: 'Q',
    fullLabel: 'Quinta',
    value: Weekday.THURSDAY,
  },
  {
    label: 'S',
    fullLabel: 'Sexta',
    value: Weekday.FRIDAY,
  },
  {
    label: 'S',
    fullLabel: 'Sábado',
    value: Weekday.SATURDAY,
  },
]

export type WeekdaySelectorProps = {
  /**
   * defauls to Dia da semana:
   */
  label?: string
  /**
   * defauls to Inválido
   */
  errorMessage?: string
  helperText?: string
  isDisabled?: boolean
  isInvalid?: boolean
  value: Weekday
  onClick: (e: MouseEvent<HTMLButtonElement>, value: Weekday) => void
}

export const WeekdaySelector = ({
  label = 'Dia da semana:',
  value,
  errorMessage,
  isDisabled,
  isInvalid,
  helperText,
  onClick,
}: WeekdaySelectorProps): JSX.Element => {
  return (
    <FormControl isDisabled={isDisabled} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <HStack spacing='3'>
        {options.map((option) => {
          const isSelected = option.value === value
          return (
            <Tooltip label={option.fullLabel} key={option.value} placement='top'>
              <Button
                variant={isSelected ? 'solid' : 'outline'}
                className={isSelected ? 'selected' : ''}
                flexGrow={1}
                onClick={(e: MouseEvent<HTMLButtonElement>) => onClick(e, option.value)}
                data-testid='weekday-btn'
              >
                {option.label}
              </Button>
            </Tooltip>
          )
        })}
      </HStack>
      {!errorMessage && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
