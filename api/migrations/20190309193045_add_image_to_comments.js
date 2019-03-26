exports.up = (knex) => {
  return knex.schema.alterTable('comments', (table) => {
    table.string('image').nullable()
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('comments', (table) => {
    table.dropColumn('image')
  })
}
