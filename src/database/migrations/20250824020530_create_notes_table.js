const { TABLES } = require('../../utils')

exports.up = function(knex) {
  return knex.schema.createTable(TABLES.NOTE, function (table) {
    table.bigIncrements('id')

    table.bigInteger('user_id').unsigned().notNullable()
    table
      .foreign('user_id')
      .references('id')
      .inTable(TABLES.USER)
      .withKeyName(`${TABLES.NOTE}_user_id_fk`)
      .onUpdate('CASCADE')
      .onDelete('NO ACTION')

    table.string('title').notNullable()
    table.text('description').nullable()

    table.timestamp('created_at').nullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable(TABLES.NOTE)
}
