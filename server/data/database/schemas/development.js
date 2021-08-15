require('dotenv').config({path: '../../../.env'});
const bcrypt = require('bcryptjs');
const { userStatusIds, numOfHashes } = require('../../../config/middleware/globals.js');

exports.up = async function (knex, Promise) {
  await knex.schema.createTable('users', (tbl) => {
    // Primary Key 'id'
    tbl.increments('id');

    // username
    tbl
      .string('username', 64)
      .notNullable()
      .defaultTo(process.env.INITIAL_USER)
      .unique();

    // password(hashed)
    tbl.string('password', 128).notNullable().defaultTo(bcrypt.hashSync(process.env.INITIAL_USER_PSWD, numOfHashes));

    // email
    tbl
      .string('email', 128)
      .notNullable()
      .defaultTo(process.env.INITIAL_USER_EMAIL)
      .unique();

    // (0 = banned), (1 = active), and (2 = inactive)
    tbl.integer('status_id', 16).notNullable().defaultTo(userStatusIds.active);

    // id for user/table
    tbl.integer('created_by').unsigned().notNullable().defaultTo(1);
    tbl
      .foreign('created_by')
      .references('users.id')
      .onDelete('CASCADE');

    // Date
    tbl.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    // id for user/table
    tbl.integer('last_edited_by').unsigned().notNullable().defaultTo(1);
    tbl
      .foreign('last_edited_by')
      .references('users.id')
      .onDelete('CASCADE');

    // Date
    tbl.timestamp('last_edited_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('todos', (tbl) => {
    // Primary Key 'id'
    tbl.increments();

    // user_id
    tbl.integer('user_id').unsigned().notNullable().defaultTo(1);
    tbl
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');

    // details
    tbl.text('details').notNullable().defaultTo("Empty...");

    // user_id
    tbl.integer('created_by').unsigned().notNullable().defaultTo(1);
    tbl
      .foreign('created_by')
      .references('users.id')
      .onDelete('CASCADE');

    // Date
    tbl.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    // user_id
    tbl.integer('last_edited_by').unsigned().notNullable().defaultTo(1);
    tbl
      .foreign('last_edited_by')
      .references('users.id')
      .onDelete('CASCADE');

    // Date
    tbl.timestamp('last_edited_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex, Promise) {
  await knex.schema.dropTableIfExists('todos');
  await knex.schema.dropTableIfExists('users');
};
