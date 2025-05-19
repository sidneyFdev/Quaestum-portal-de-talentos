import Address from '#models/address'
import Education from '#models/education'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'

export default class RecruitersController {
  async get({ response }: HttpContext) {
    const users = await User.all()

    const userData = await Promise.all(
      users
        .filter((user) => !user.is_admin)
        .filter((user) => !user.is_recruiter)
        .map(async (user) => {
          const data = user.serialize()

          const skills = await db.from('users_skills').where('user_id', data.id).select('skill_id')

          data.skills = skills.map((s) => s.skill_id)

          delete data.emailToken
          delete data.emailVerified
          delete data.isAdmin
          delete data.isRecruiter
          delete data.password

          return data
        })
    )

    return response.ok(userData)
  }

  async invite({ response, auth, request }: HttpContext) {
    try {
      const loggedUser = await auth.authenticate()
      const isAdmin = loggedUser.is_admin

      if (!isAdmin) {
        return response.status(401).send({ message: 'Não autorizado!' })
      }

      const { emailList, interviewDate } = request.body()

      if (!emailList || emailList.length === 0) {
        return response.status(400).send({ message: 'A lista de e-mails está vazia.' })
      }

      await Promise.all(
        emailList.map((destinyEmail: string) =>
          mail.send((message) => {
            message
              .to(destinyEmail)
              .from(`${process.env.MAIL_FORM}`)
              .subject('Parabéns! Você foi convidado para uma entrevista!').html(`
                  <h1>Olá ${destinyEmail}</h1>
                  <p>Temos o prazer de informar que você foi convidado para fazer uma entrevista com a equipe Quaestum.</p>
                  <p><strong>Data da entrevista:</strong> ${interviewDate}</p>
                  <p>Link para reunião online: <a href="#">https://umareuniao.com.br/id_da_reuniao</a></p>
                  <p>Contamos com a sua presença!</p>
                `)
          })
        )
      )

      return response.status(200).send({
        message: 'Convites enviados com sucesso!',
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Erro interno ao enviar convites.',
      })
    }
  }

  async select({ response, auth, request }: HttpContext) {
    const loggedUser = await auth.authenticate()

    const { email } = request.body()
    const isAdmin = loggedUser.is_admin

    if (!isAdmin) {
      return response.abort('Não autorizado!')
    }

    const targetUser = await User.findBy('email', email)
    if (!targetUser) {
      return response.abort('Usuário não encontrado!')
    }

    const userData = targetUser.serialize()

    const address = await Address.findBy('user_id', userData.id)
    const educations = await Education.findManyBy('user_id', userData.id)
    const skills = await db.from('users_skills').where('user_id', userData.id).select('skill_id')

    const educationData = educations.map((edu) => {
      const data = edu.serialize()
      delete data.id
      delete data.userId
      return data
    })

    const addressData = address
      ? (() => {
          const data = address.serialize()
          delete data.id
          delete data.userId
          return data
        })()
      : null

    userData.address = addressData
    userData.educations = educationData
    userData.skills = skills.map((s) => s.skill_id)

    delete userData.emailToken
    delete userData.emailVerified
    delete userData.isAdmin
    delete userData.isRecruiter
    delete userData.id
    delete userData.password

    return response.ok(userData)
  }
}
