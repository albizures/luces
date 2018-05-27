
exports.up = (knex) => {
  return knex.schema.createTable('interests', (table) => {
    table.integer('id_category').unsigned()
    table.integer('id_user').unsigned()
    table.boolean('deleted').notNullable().defaultTo(false)

    table.foreign('id_user').references('users.id_user')
    table.foreign('id_category').references('categories.id')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('interests')
}
