
exports.up = (knex) => {
  return knex.schema.createTable('courses', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('description')
    table.string('image_url').notNullable()
    table.float('raiting').defaultTo(0)
    table.timestamps(false, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('courses')
}
