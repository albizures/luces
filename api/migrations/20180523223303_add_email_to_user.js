
exports.up = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.string('email')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('email')
  })
}
