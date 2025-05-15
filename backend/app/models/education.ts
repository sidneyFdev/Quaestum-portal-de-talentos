import { BaseModel, belongsTo, column} from '@adonisjs/lucid/orm'
import Candidate from './candidate.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { DateTime } from 'luxon'

export default class Education extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare candidateId: number

  @column()
  declare institution: string

  @column()
  declare course: string

  @column.date()
  declare conclusion: DateTime

  @belongsTo(() => Candidate)
  declare candidate: BelongsTo<typeof Candidate>
}