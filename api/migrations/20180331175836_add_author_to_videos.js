
exports.up = (knex) => {
  return knex.schema.alterTable('videos', (table) => {
    table.string('author')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('videos', (table) => {
    table.dropColumn('author')
  })
}
