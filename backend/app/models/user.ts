import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import Address from './address.js'
import type { HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Skill from './skill.js'
import Education from './education.js'
import Hash from '@adonisjs/core/services/hash'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare is_admin: boolean

  @column()
  declare is_recruiter: boolean

  @column()
  declare name: string

  @column()
  declare last_name: string

  @column()
  declare password: string

  @column()
  declare email: string

  @column()
  declare telephone: string

  @column.date()
  declare birthdate: DateTime

  @column()
  declare email_token: string | null

  @column()
  declare email_verified: boolean

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>

  @hasMany(() => Education)
  declare educations: HasMany<typeof Education>
  
  @manyToMany(() => Skill, {
    pivotTable: 'users_skills',
  })
  declare skills: ManyToMany<typeof Skill>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static async hashPassword(user: User){
    if(user.$dirty.password){
      user.password = await Hash.make(user.password)
    }
  }

  static accessTokens = DbAccessTokensProvider.forModel(User,{
    expiresIn: '3 hours',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}