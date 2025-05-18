import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'

export default class SessionController {
    async store({ request , response}:HttpContext){
        const {email, password} = request.only(['email', 'password'])

        const user = await User.findBy('email', email)

        if (!user) {
            return response.abort('Invalid credentials user')
          }

        const isPasswordValid = await hash.verify(user.password, password)

    
        if (!isPasswordValid) {
            return response.abort('Invalid credentials password')
        }
        await db.from('auth_access_tokens')
            .where('tokenable_id', user.id)
            .andWhere('type', 'auth_token')
            .delete()

        const token = await User.accessTokens.create(user)

        return {
            type: 'bearer',
            value: token.value!.release(),
        }
    }

    async logout({ request, response, auth}: HttpContext) {
        const loggedUser = await auth.authenticate()
        const { email } = request.only(['email'])
    
        const user = await User.findBy('email', email)
        
        if (!user) {
            return response.status(404).send({ message: 'Usuário não encontrado' })
        } 

        if (loggedUser.email !== email) {
            return response.status(403).send({ message: 'Acesso Negado!'})
        }

        await db.from('auth_access_tokens')
            .where('tokenable_id', loggedUser.id)
            .andWhere('type', 'auth_token')
            .delete()

        return response.ok({ message: 'Realizado Logout com sucesso!'})
    }
}