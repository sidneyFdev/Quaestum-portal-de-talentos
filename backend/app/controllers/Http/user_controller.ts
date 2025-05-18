import Address from '#models/address'
import Education from '#models/education'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { v4 as uuidv4 } from 'uuid'
import crypto from 'node:crypto'


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
      'address',
      'number',
      'city',
      'uf',
      'postcode'
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

    if (userData.educations && userData.educations > 0){
        let educations = userData.educations
        await Education.createMany(
            educations.map(value=>{
              return {
                ...value,
                user_id: user?.id
              }
            })
        )
    }

    if (userData.skills?.length) {
      await user.related('skills').attach(userData.skills)
    }

    if(userData.address) {
      await Address.updateOrCreate(
      {user_id: user?.id},  
      {
        user_id: user?.id,
        address: userData.address,
        number: userData.number,
        city: userData.city,
        uf: userData.uf,
        postcode: userData.postcode
      })
    }

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

  async getData({ request , response, auth }: HttpContext) {
    const loggedUser  = await auth.authenticate();
    const { email } = request.only(['email']);
    
    console.log('Logged User:', loggedUser );
    console.log('Email from request:', email);
    const user = await User.findBy('email', email);
    
    if (!user) {
        return response.status(404).send({ message: 'Usuário não encontrado' });
    } 
    
    if (loggedUser .email !== email) {
        return response.status(403).send({ message: 'Acesso Negado!' });
    }

    const isOwnerUser = loggedUser.email === email
    const isAdminUser = loggedUser.is_admin

    if (!isOwnerUser && !isAdminUser) {
      return response.status(403).send({ message: 'Acesso Negado!'})
    }
  
    return response.ok(user)
  }
}
