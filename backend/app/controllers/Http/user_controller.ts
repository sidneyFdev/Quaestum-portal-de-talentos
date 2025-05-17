import Address from '#models/address'
import Education from '#models/education'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { v4 as uuidv4 } from 'uuid'

export default class CandidatesController {
  async store({ request, response }: HttpContext) {
    const candidateData = request.only([
      'name',
      'last_name',
      'email',
      'telephone',
      'birthdate',
      'educations',
      'address',
      'skills',
      'address',
      'number',
      'city',
      'uf',
      'postcode'
    ])
    const user = await User.create({
      name: candidateData.name,
      email: candidateData.email,
      telephone: candidateData.telephone,
      last_name: candidateData.last_name,
      birthdate: candidateData.birthdate,
    })

    if (candidateData.educations && candidateData.educations > 0){
        let educations = candidateData.educations
        await Education.createMany(
            educations.map(value=>{
              return {
                ...value,
                user_id: user?.id
              }
            })
        )
    }

    if (candidateData.skills?.length) {
      await user.related('skills').attach(candidateData.skills)
    }

    if(candidateData.address) {
      await Address.updateOrCreate(
      {user_id: user?.id},  
      {
        user_id: user?.id,
        address: candidateData.address,
        number: candidateData.number,
        city: candidateData.city,
        uf: candidateData.uf,
        postcode: candidateData.postcode
      })
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
    const candidate = await User.findOrFail(params.email)
    await candidate.delete()
    return response.noContent()
  }
}
