require('dotenv').config();
/* postgress
const localPgConnection = {
  host: process.env.HOST,
  database: process.env.DB_NAME,
  user: process.env.USER,
  password: process.env.PASS || ''
};

const dbConnection = process.env.DATABASE_URL || localPgConnection;

const dbSettings = {
  client: 'pg',
  connection: dbConnection,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './migrations',
    // tableName: 'dbmigrations' <---- default table name "knex_migrations", used to keep track of migrations and rollbacks via knex
  },
  seeds: {
    directory: './seeds'
  }
};
*/

const devDbSettings = {
  client: 'sqlite3',
  connection: { filename: process.env.DB_NAME ? `./${process.env.DB_NAME}` : './data/database/dev.db3' },
  migrations: {
    directory: './data/database/schemas',
    // tableName: 'dbmigrations' <---- default table name "knex_migrations", used to keep track of migrations and rollbacks via knex
  },
  seeds: { directory: './data/database/seeds' },
  useNullAsDefault: true // used to avoid warning on console
}

module.exports = {
  /* keys used by knex library:
    development
    staging
    procution
  */
  development: devDbSettings,
  dev: devDbSettings, // used for custom dbConfig
  production: devDbSettings,
  prod: devDbSettings // used for custom dbConfig
};