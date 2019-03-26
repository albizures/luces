
exports.up = (knex) => {
  return knex.schema.alterTable('comments', (table) => {
    table.integer('itComments').unsigned().nullable()

    table.foreign('itComments').references('comments.id')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('comments', (table) => {
    table.dropForeign('itComments')
    table.dropColumn('itComments')
  })
}
