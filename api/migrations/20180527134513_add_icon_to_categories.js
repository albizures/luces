
exports.up = (knex) => {
  return knex.schema.alterTable('categories', (table) => {
    table.integer('icon')
  }).then(() => knex('categories').update('icon', 0))
}

exports.down = (knex) => {
  return knex.schema.alterTable('categories', (table) => {
    table.dropColumn('icon')
  })
}
