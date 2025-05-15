import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'educations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('candidate_id').unsigned().references('id').inTable('candidates').onDelete('CASCADE')
      table.string('institution', 80).notNullable()
      table.string('course', 80).notNullable()
      table.date('conclusion').notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}