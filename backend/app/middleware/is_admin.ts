
import type { HttpContext } from '@adonisjs/core/http'

export default class IsAdmin {
  async handle({ auth, response }: HttpContext, next: () => Promise<void>) {
    const user = auth.user

    if (!user || !user.is_admin) {
      return response.unauthorized({ message: 'Acesso restrito a administradores.' })
    }

    await next()
  }
}