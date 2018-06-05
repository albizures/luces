
exports.up = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.string('password')
    table.timestamps(false, true)
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('password')
    table.dropTimestamps()
  })
}
