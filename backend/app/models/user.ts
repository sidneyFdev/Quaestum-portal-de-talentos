import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Address from './address.js'
import type { HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Skill from './skill.js'
import Education from './education.js'


const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
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

  @column({ serializeAs: null })
  declare password: string | undefined

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
}