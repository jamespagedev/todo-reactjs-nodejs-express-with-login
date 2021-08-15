# todo-reactjs-nodejs-express-with-login
out of the box react, nodejs, express, with proxy, certs, authentication... to be tested with multiple libraries

# Commands To Setup Database
```
// creates a seed file
npx knex migrate:make one

// reverts table(s)
npx knex migrate:rollback

// injects table(s)
npx knex migrate:latest

// injects seed values
npx knex seed:run

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