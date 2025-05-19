import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('address', 80).notNullable()
      table.string('number', 80).nullable()
      table.string('city', 80).notNullable()
      table.string('uf', 2).notNullable()
      table.string('postcode', 10).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
