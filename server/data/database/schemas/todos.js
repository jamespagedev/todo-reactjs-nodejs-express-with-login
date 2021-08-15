exports.up = function (knex, Promise) {
  return knex.schema.createTable('todos', function (tbl) {
    // Primary Key 'id'
    tbl.increments();

    // user_id
    tbl
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .notNullable();

    // details
    tbl.text('details').notNullable();

    // user_id
    tbl
      .foreign('created_by')
      .references('id')
      .inTable('users')
      .notNullable();

    // Date in milliseconds
    tbl.bigInteger('created_at').notNullable();

    // user_id
    tbl
      .foreign('last_edited_by')
      .references('id')
      .inTable('users')
      .notNullable();

    // Date in milliseconds
    tbl.bigInteger('last_edited_at').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('todos');
};
