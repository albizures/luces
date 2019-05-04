
const useCharset = async (knex, table) => {
  const exists = await knex.schema.hasTable(table);
  if (exists) {
    return knex.schema.raw(`ALTER TABLE ${table} CONVERT TO CHARACTER SET utf8mb4`)
  }
}

exports.up = function(knex, Promise) {
  return Promise.all([
    useCharset(knex, 'comments'),
    useCharset(knex, 'categories'),
    useCharset(knex, 'subcategories'),
    useCharset(knex, 'courses'),
    useCharset(knex, 'users'),
    useCharset(knex, 'videos'),
  ])
};

exports.down = function(knex, Promise) {
  
};
