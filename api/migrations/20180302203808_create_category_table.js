
exports.up = (knex) => {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.timestamps(false, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('categories')
}
