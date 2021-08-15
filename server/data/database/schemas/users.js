exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (tbl) {
    // Primary Key 'id'
    tbl.increments();

    // username
    tbl
      .string('username', 64)
      .notNullable()
      .unique();

    // password
    tbl.string('password', 128).notNullable();

    // email
    tbl
      .string('email', 128)
      .notNullable()
      .unique();

    // (0 = banned), (1 = active), and (2 = inactive)
    tbl.integer('status_id', 16).notNullable();

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
  return knex.schema.dropTableIfExists('users');
};
