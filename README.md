# todo-reactjs-nodejs-express-with-login
out of the box react, nodejs, express, with proxy, certs, authentication... to be tested with multiple libraries

# Commands To Setup Database
Note: I recommend using SQLiteStudio to view the database db3 file.
- commands to setup db and data:
```
// creates file.db3 and injects schema(s) to create table(s)
npx knex migrate:latest

// injects data into table(s)
npx knex seed:run
```
- (optional/useful) commands to setup db and data:
```
// creates a schema file.
npx knex migrate:make filename

// reverts schema(s)/table(s) in the database file.
npx knex migrate:rollback

// injects specific schema (example: development.js)
npx knex migrate:up development.js

// reverts specific schema (example: development.js)
npx knex migrate:down development.js

// heroku commands:
  heroku login
  heroku run knex migrate:rollback -a todo-backend
  heroku run knex migrate:latest -a todo-backend
  heroku run knex seed:run -a todo-backend
```