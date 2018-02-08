
exports.up = (knex) => {
  return knex.schema.createTable('videos', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('description')
    table.string('id_youtube').notNullable()
    table.timestamps(false, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('videos')
}
