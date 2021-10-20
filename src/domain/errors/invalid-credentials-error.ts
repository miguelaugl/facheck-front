export class InvalidCredentialsError extends Error {
  constructor() {
    super('As credenciais informadas estão inválidas.')
    this.name = 'InvalidCredentialsError'
  }
}
