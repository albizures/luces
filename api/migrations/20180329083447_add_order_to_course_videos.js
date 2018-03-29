
exports.up = (knex) => {
  return knex.schema.alterTable('course_videos', (table) => {
    table.integer('order').unsigned()
  }).then(() => knex('course_videos').update('order', 1))
}

exports.down = (knex) => {
  return knex.schema.alterTable('course_videos', (table) => {
    table.dropColumn('order')
  })
}
