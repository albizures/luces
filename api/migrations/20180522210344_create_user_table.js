
exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id_user').primary()
    table.string('name')
    table.string('facebook_id')
    table.string('gender')
    table.string('cover')
    table.boolean('deleted').notNullable().defaultTo(false)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users')
}
