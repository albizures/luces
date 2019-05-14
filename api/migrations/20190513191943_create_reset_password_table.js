
exports.up = (knex) => {
  return knex.schema.createTable('reset_password', (table) => {
    table.increments('id').primary()
    table.integer('id_user').unsigned()
    table.string('token')

    table.boolean('deleted').notNullable().defaultTo(false)

    table.foreign('id_user').references('users.id_user')
    table.timestamps(false, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('reset_password')
}
