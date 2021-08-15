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
console.log('process.env.INITIAL_USER:', process.env.INITIAL_USER);
const devDbSettings = {
  client: 'sqlite3',
  connection: { filename: './devToDo.db3' },
  migrations: {
    directory: './schemas',
    tableName: 'dbmigrations'
  },
  seeds: { directory: './seeds' },
  useNullAsDefault: true // used to avoid warning on console
}
const testDbSettings = {
  client: 'sqlite3',
  connection: { filename: './testToDo.db3' },
  migrations: {
    directory: './schemas',
    tableName: 'dbmigrations'
  },
  seeds: { directory: './seeds' }
}

const prodDbSettings = {
  client: 'sqlite3',
  connection: { filename: './prodToDo.db3' },
  migrations: {
    directory: './schemas',
    tableName: 'dbmigrations'
  },
  seeds: { directory: './seeds' },
  useNullAsDefault: true // used to avoid warning on console
}

module.exports = {
  dev: devDbSettings,
  test: testDbSettings,
  prod: prodDbSettings
};