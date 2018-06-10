
exports.up = (knex) => {
  return knex.schema.createTable('favorites', (table) => {
    table.integer('id_course').unsigned()
    table.integer('id_user').unsigned()
    table.boolean('deleted').notNullable().defaultTo(false)

    table.foreign('id_course').references('courses.id')
    table.foreign('id_user').references('users.id_user')

    table.timestamps(false, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('favorites')
}
