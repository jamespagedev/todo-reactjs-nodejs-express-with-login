require('dotenv').config({path: '../../.env'});
/* postgress
const localPgConnection = {
  host: process.env.HOST,
  database: process.env.DATABASE,
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
    tableName: 'dbmigrations'
  },
  seeds: {
    directory: './seeds'
  }
};
*/

const devDbSettings = {
  client: 'sqlite3',
  connection: { filename: process.env.DB_NAME ? `./${process.env.DB_NAME}` : './devToDo.db3' },
  migrations: {
    directory: './schemas',
    tableName: 'dbmigrations'
  },
  seeds: { directory: './seeds' },
  useNullAsDefault: true // used to avoid warning on console
}

module.exports = {
  development: devDbSettings,
  production: devDbSettings
};