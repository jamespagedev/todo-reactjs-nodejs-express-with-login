# todo-reactjs-nodejs-express-with-login
out of the box react, nodejs, express, with proxy, certs, authentication... to be tested with multiple libraries

# Commands To Setup Database
- Note: I recommend using SQLiteStudio to view the database db3 file.
```
// creates a seed file
npx knex migrate:make filename

// injects table(s)
npx knex migrate:latest

// reverts table(s)
npx knex migrate:rollback

// injects specific table (example: development.js)
npx knex migrate:up development.js --knexfile project_location\server\data\database\knexfile.js
or from location "project_location\server":
  npx knex migrate:up development.js --knexfile data\database\knexfile.js

// reverts specific table (example: development.js)
npx knex migrate:down development.js --knexfile project_location\server\data\database\knexfile.js
or from location "project_location\server":
  npx knex migrate:down development.js --knexfile data\database\knexfile.js

// injects seed values
npx knex seed:run --knexfile <project_location>\server\data\database\knexfile.js
or from location "project_location\server":
  npx knex seed:run --knexfile data\database\knexfile.js

// heroku commands:
  heroku login
  heroku run knex migrate:rollback -a irsr-backend
  heroku run knex migrate:latest -a irsr-backend
  heroku run knex seed:run -a irsr-backend
```

# Setup Certs in proxyserver and server
- open commandline and change directory to <project_location>/proxyserver
- execute command `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./proxyserver.key -out proxyserver.crt`
- add the following information:
  - Country Name (2 letter code) [AU]: **US**
  - State or Province Name (full name) [Some-State]: **TEXAS**
  - Locality Name (eg, city) []: **DALLAS**
  - Organization Name (eg, company) [Internet Widgits Pty Ltd]: **COMPANY_NAME**
  - Organizational Unit Name (eg, section) []: **PROXYSERVER**
  - Common Name (e.g. server FQDN or YOUR name) []: **localhost**
  - Email Address []: **Your email**
- repeate the same steps for the **server** directory