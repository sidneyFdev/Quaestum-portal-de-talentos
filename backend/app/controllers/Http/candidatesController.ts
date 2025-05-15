import Candidate from '#models/candidate'
import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { v4 as uuidv4 } from 'uuid'

export default class CandidatesController {
  async store({ request, response }: HttpContext) {
    const candidateData = request.only([
      'name',
      'lastname',
      'email',
      'telephone',
      'birthdate',
      'educations',
      'skills',
    ])
    const user = await Candidate.create({
      name: candidateData.name,
      email: candidateData.email,
      telephone: candidateData.telephone,
      lastname: candidateData.lastname,
      birthdate: candidateData.birthdate,
    })

    for (const edu of candidateData.educations) {
      await user.related('educations').create({
        institution: edu.institution,
        course: edu.course,
        conclusion: edu.conclusion,
      })
    }

    if (candidateData.skills?.length) {
      await user.related('skills').attach(candidateData.skills)
    }

    const token = uuidv4()
    user.email_token = token
    await user.save()

    await mail.send((message) => {
      message
        .to(user.email)
        .from(`${process.env.MAIL_FORM}`)
        .subject('Verifique seu e-mail - Quaestum').html(`
            <h1>Olá ${user.name}</h1>
            <p>Confirme seu e-mail clicando no link abaixo:</p>
            <a href="${process.env.DB_URL}confirm/${token}">Confirmar e-mail</a>`)
    })

    return response.created(user)
  }

  async remove({ params, response }: HttpContext) {
    const candidate = await Candidate.findOrFail(params.email)
    await candidate.delete()
    return response.noContent()
  }
}
