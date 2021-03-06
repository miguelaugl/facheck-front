import { BaseSchema } from 'yup'
import { AnyObject, Maybe } from 'yup/lib/types'

declare module 'yup' {
  interface StringSchema<TType extends Maybe<string> = string | undefined, TContext extends AnyObject = AnyObject, TOut extends TType = TType>
    extends BaseSchema<TType, TContext, TOut> {
    integer: () => StringSchema<TType, TContext>
    cpf: () => StringSchema<TType, TContext>
    passwordStrength: (regex?: RegExp, message?: string) => StringSchema<TType, TContext>
    militaryTime: () => StringSchema<TType, TContext>
  }
}
