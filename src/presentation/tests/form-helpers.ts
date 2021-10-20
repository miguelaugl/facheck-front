import { waitFor, screen, fireEvent } from '@testing-library/dom'

export const simulateFieldInteraction = async (fieldName: string, value: any): Promise<void> => {
  const input = screen.getByTestId(fieldName)
  await waitFor(() => {
    fireEvent.input(input, { target: { value } })
  })
  await waitFor(() => {
    fireEvent.blur(input)
  })
}
