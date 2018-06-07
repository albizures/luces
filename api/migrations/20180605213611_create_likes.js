
exports.up = (knex) => {
  return knex.schema.createTable('likes', (table) => {
    table.integer('id_comment').unsigned()
    table.integer('id_user').unsigned()
    table.boolean('deleted').notNullable().defaultTo(false)

    table.foreign('id_comment').references('comments.id')
    table.foreign('id_user').references('users.id_user')

    table.timestamps(false, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('likes')
}
