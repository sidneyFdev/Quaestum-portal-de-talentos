import Education from '#models/education'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { v4 as uuidv4 } from 'uuid'
import crypto from 'node:crypto'
import db from '@adonisjs/lucid/services/db'
import Address from '#models/address'

export default class UsersController {
  async store({ request, response }: HttpContext) {
    function generateRandomPassword(length = 12) {
      return crypto.randomBytes(length).toString('base64').slice(0, length)
    }

    const userData = request.only([
      'name',
      'last_name',
      'email',
      'telephone',
      'birthdate',
      'educations',
      'address',
      'skills',
      'address_number',
      'city',
      'uf',
      'postcode',
    ])

    const token = uuidv4()
    const user = await User.create({
      name: userData.name,
      email: userData.email,
      telephone: userData.telephone,
      last_name: userData.last_name,
      birthdate: userData.birthdate,
      email_token: token,
      password: generateRandomPassword(),
    })

    if (userData.educations && userData.educations.length > 0) {
      await Education.createMany(
        userData.educations.map((value: Object) => {
          return {
            ...value,
            user_id: user?.id,
          }
        })
      )
    }

    if (userData.skills?.length) {
      await user.related('skills').attach(userData.skills)
    }

    if (userData.address) {
      await Address.updateOrCreate(
        { user_id: user?.id },
        {
          user_id: user?.id,
          address: userData.address,
          number: userData.address_number,
          city: userData.city,
          uf: userData.uf,
          postcode: userData.postcode,
        }
      )
    }

    await mail.send((message) => {
      message
        .to(user.email)
        .from(`${process.env.MAIL_FORM}`)
        .subject('Verifique seu e-mail - Quaestum').html(`
            <h1>Olá ${user.name}</h1>
            <p>Confirme seu e-mail clicando no link abaixo:</p>
            <a href="${process.env.FRONTEND_URL}confirm/${token}">Confirmar e-mail</a>`)
    })

    return response.created({
      message: 'Usuário criado com sucesso! Verifique seu e-mail para continuar.',
      user: {
        name: user.name,
        email: user.email,
      },
    })
  }

  async remove({ params, response }: HttpContext) {
    const candidate = await User.findOrFail(params.email)
    await candidate.delete()
    return response.noContent()
  }

  async get({ response, auth }: HttpContext) {
    const loggedUser = await auth.authenticate()

    const userData = loggedUser.serialize()

    const address = await Address.findBy('user_id', userData.id)
    const educations = await Education.findManyBy('user_id', userData.id)
    const skills = await db.from('users_skills').where('user_id', userData.id).select('skill_id')

    const educationData = educations.map((edu) => {
      const data = edu.serialize()
      delete data.id
      delete data.userId
      return data
    })

    userData.address = address
    userData.educations = educationData
    userData.skills = skills

    delete userData.emailToken
    delete userData.emailVerified
    delete userData.isAdmin
    delete userData.isRecruiter
    delete userData.id
    delete userData.password
    userData.address = address
      ? (() => {
          const data = address.serialize()
          delete data.id
          delete data.userId
          return data
        })()
      : null

    return response.ok(userData)
  }
}
