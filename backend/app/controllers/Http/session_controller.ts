import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/services/hash'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'

export default class SessionController {
  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)

    if (!user) {
      return response.abort('Invalid credentials user')
    }

    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      return response.abort('Invalid credentials password')
    }

    await db
      .from('auth_access_tokens')
      .where('tokenable_id', user.id)
      .andWhere('type', 'auth_token')
      .delete()

    const token = await User.accessTokens.create(user)

    await mail.send((message) => {
      message
        .to(email)
        .from(`${process.env.MAIL_FORM}`)
        .subject('Notificação de Login - Portal de talentos - Quaestum').html(`
              <h1>Olá ${user.name}</h1>
              <p>Um novo login foi realizado com sucesso.</p>
              <p>Se não foi você, entre em contato com o suporte.</p>
            `)
    })

    return {
      type: 'bearer',
      value: token.value!.release(),
      isAdmin: Boolean(user?.is_admin),
    }
  }

  async logout({ request, response, auth }: HttpContext) {
    const loggedUser = await auth.authenticate()
    const { email } = request.only(['email'])

    const user = await User.findBy('email', email)

    if (!user) {
      return response.status(404).send({ message: 'Usuário não encontrado' })
    }

    if (loggedUser.email !== email) {
      return response.status(403).send({ message: 'Acesso Negado!' })
    }

    await db
      .from('auth_access_tokens')
      .where('tokenable_id', loggedUser.id)
      .andWhere('type', 'auth_token')
      .delete()

    return response.ok({ message: 'Realizado Logout com sucesso!' })
  }

  async reset({ request, params, response }: HttpContext) {
    const { password } = request.body()
    const receivedToken = params.token

    const tokenEntry = await db
      .from('password_reset_tokens')
      .where('hash', receivedToken)
      .andWhere('type', 'password_reset')
      .first()

    if (!tokenEntry) {
      return response.status(400).send({ message: 'Token inválido ou expirado.' })
    }

    const user = await User.find(tokenEntry.tokenable_id)
    if (!user) {
      return response.status(404).send({ message: 'Usuário não encontrado.' })
    }

    user.password = await hash.make(password)
    await user.save().catch((err) => {
      return response.status(500).send({ message: 'Erro ao salvar a nova senha.' })
    })

    await db
      .from('password_reset_tokens')
      .where('tokenable_id', user.id)
      .andWhere('type', 'password_reset')
      .delete()

    return response.status(200).send({
      code: 200,
      message: 'Senha alterada com sucesso!',
    })
  }

  async createReset({ request, response }: HttpContext) {
    const { email } = request.only(['email'])

    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(404).send({ message: 'Usuário não encontrado' })
    }

    await db
      .from('password_reset_tokens')
      .where('tokenable_id', user.id)
      .andWhere('type', 'password_reset')
      .delete()

    const token = await User.passwordResetTokens.create(user)

    await mail.send((message) => {
      message
        .to(user.email)
        .from(`${process.env.MAIL_FORM}`)
        .subject('Redefinição de Senha - Quaestum').html(`
              <h1>Olá ${user.name}</h1>
              <p>Clique no link abaixo para redefinir sua senha:</p>
              <a href="${process.env.FRONTEND_URL}reset/${token.hash}">Alterar senha</a>
            `)
    })

    return response.status(200).send({ message: 'Instruções enviadas por e-mail' })
  }
}
