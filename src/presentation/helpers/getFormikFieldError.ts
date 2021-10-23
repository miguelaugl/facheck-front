import { FormikProps } from 'formik'

export const getFormikFieldError = (name: string, form: FormikProps<any>): string => {
  return form.touched[name] || form.submitCount ? form.getFieldMeta(name).error : ''
}
