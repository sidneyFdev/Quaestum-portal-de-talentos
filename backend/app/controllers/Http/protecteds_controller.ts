import { HttpContext } from '@adonisjs/core/http'

export default class ProtectedController {
    async index({ auth, response }: HttpContext) {
        const user = await auth.authenticate()
        return response.json({ message: 'Welcome to the protected route!', user })
    }
}
