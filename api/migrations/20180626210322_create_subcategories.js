
exports.up = (knex) => {
  return knex.schema.createTable('subcategories', (table) => {
    table.increments('id').primary()
    table.integer('id_category').unsigned()
    table.string('name').notNullable()
    table.boolean('deleted').notNullable().defaultTo(false)

    table.foreign('id_category').references('categories.id')

    table.timestamps(false, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('subcategories')
}
