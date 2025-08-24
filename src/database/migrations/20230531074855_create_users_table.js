const { TABLES } = require('../../utils')

exports.up = function(knex) {
  return knex.schema.createTable(TABLES.USER, function (table) {
    table.bigIncrements('id')
    table.string('name').notNullable()
    table.string('email', 100).notNullable()
    table.string('password').notNullable()
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable(TABLES.USER)
}
