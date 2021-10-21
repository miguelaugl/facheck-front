export interface FieldFormatter {
  apply: (value: string | number) => string

  clean: (value: string) => string | number
}
