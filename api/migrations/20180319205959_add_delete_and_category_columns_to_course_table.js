
exports.up = (knex) => {
  return knex.schema.alterTable('courses', (table) => {
    table.integer('id_category').unsigned()
    table.foreign('id_category').references('courses.id')
    table.boolean('deleted').notNullable().defaultTo(false)
  }).then(() => knex('courses').update('deleted', false))
}

exports.down = (knex) => {
  return knex.schema.alterTable('courses', (table) => {
    table.dropColumn('deleted')
    table.dropForeign('id_category')
    table.dropColumn('id_category')
  })
}
