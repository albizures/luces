
exports.up = (knex) => {
  return knex.schema.alterTable('categories', (table) => {
    table.boolean('deleted').notNullable().defaultTo(false)
  }).then(() => knex('categories').update('deleted', false))
}

exports.down = (knex) => {
  return knex.schema.alterTable('categories', (table) => {
    table.dropColumn('deleted')
  })
}
