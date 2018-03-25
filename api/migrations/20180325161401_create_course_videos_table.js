
exports.up = (knex) => {
  return knex.schema.createTable('course_videos', (table) => {
    table.integer('id_video').unsigned()
    table.integer('id_course').unsigned()
    table.boolean('deleted').notNullable().defaultTo(false)

    table.foreign('id_video').references('videos.id')
    table.foreign('id_course').references('courses.id')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('course_videos')
}
