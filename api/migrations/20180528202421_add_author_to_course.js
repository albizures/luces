
exports.up = (knex) => {
  return knex.schema.alterTable('courses', (table) => {
    table.string('author')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('courses', (table) => {
    table.dropColumn('author')
  })
}
