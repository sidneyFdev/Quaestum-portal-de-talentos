import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SkillUser extends BaseSchema {
  protected tableName = 'candidate_skills'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('candidate_id')
        .unsigned()
        .references('id')
        .inTable('candidates')
        .onDelete('CASCADE')
      table
        .integer('skill_id')
        .unsigned()
        .references('id')
        .inTable('skills')
        .onDelete('CASCADE')
      table.unique(['candidate_id', 'skill_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
