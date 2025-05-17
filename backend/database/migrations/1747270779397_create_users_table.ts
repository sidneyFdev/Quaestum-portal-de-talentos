import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.boolean('is_admin').defaultTo(false)
      table.boolean('is_recruiter').defaultTo(false)
      table.string('name', 80).notNullable()
      table.string('last_name', 100).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('telephone', 80).nullable()
      table.string('password', 255).nullable()
      table.string('email_token', 80).nullable()
      table.boolean('email_verified').defaultTo(false)
      table.date('birthdate').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}