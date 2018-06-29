
exports.up = (knex) => {
  return knex.schema.createTable('course_subcategories', (table) => {
    table.integer('id_course').unsigned()
    table.integer('id_subcategory').unsigned()
    table.boolean('deleted').notNullable().defaultTo(false)

    table.foreign('id_course').references('courses.id')
    table.foreign('id_subcategory').references('subcategories.id')

    table.timestamps(false, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('course_subcategories')
}
