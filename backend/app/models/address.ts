import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare address: string

  @column()
  declare number: string

  @column()
  declare city: string

  @column()
  declare uf: string

  @column()
  declare postcode: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
