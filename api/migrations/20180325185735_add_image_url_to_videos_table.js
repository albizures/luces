
exports.up = (knex) => {
  return knex.schema.alterTable('videos', (table) => {
    table.string('image_url')
    table.boolean('deleted').notNullable().defaultTo(false)
  }).then(() => knex('videos').update('deleted', false))
}

exports.down = (knex) => {
  return knex.schema.alterTable('videos', (table) => {
    table.dropColumn('deleted')
    table.dropColumn('image_url')
  })
}
