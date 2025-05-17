import { BaseModel, belongsTo, column} from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { DateTime } from 'luxon'
import User from './user.js'

export default class Education extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' }) 
  declare user_id: number

  @column()
  declare institution: string

  @column()
  declare course: string

  @column.date()
  declare start_date: DateTime

  @column.date()
  declare finished_date: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}