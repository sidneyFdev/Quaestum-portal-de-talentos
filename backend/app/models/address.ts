import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Candidate from './candidate.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare candidateId: string

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

  @belongsTo(() => Candidate)
  declare candidate: BelongsTo<typeof Candidate>
}
