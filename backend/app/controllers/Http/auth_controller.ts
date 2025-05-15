import { HttpContext } from '@adonisjs/core/http';
import Candidate from '#models/candidate';

export default class AuthController {
    async update({ params, response}: HttpContext){
        const user = await Candidate.findBy('email_token', params.token)

        if (!user){
            return response.status(400).send({ message: 'Token Invalido'})
        }

        user.email_verified = true
        user.email_token = null
        await user.save()

        return response.send({ message: 'Email confirmado com sucesso!'})
    }
}