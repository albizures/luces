
exports.up = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.boolean('admin').notNullable().defaultTo(false)
  }).then(() => knex('users').update('admin', false))
}

exports.down = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('admin')
  })
}
