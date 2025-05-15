import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Candidate from './candidate.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Candidate, {
    pivotTable: 'candidate_skills',
  })
  declare candidates: ManyToMany<typeof Candidate>
}