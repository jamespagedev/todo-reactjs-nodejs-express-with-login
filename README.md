# todo-reactjs-nodejs-express-with-login
out of the box react, nodejs, express, with proxy, certs, authentication... to be tested with multiple libraries

# setup environment variables
create .env files in the following folders with the content shown in examples
- server
```
// examples
REACT_APP_INTEG_PROXY_SERVER=http://localhost:5001
REACT_APP_ACPT_PROXY_SERVER=http://localhost:5001
REACT_APP_PROD_PROXY_SERVER=http://localhost:5001
REACT_APP_DEPLOY_PROXY_SERVER=http://localhost:5001
```
- proxyserver
```
// examples
PROXY_PORT=5001
PROXY_SERVER_CRED_CERT=proxyservercert.pem
PROXY_SERVER_CRED_KEY=proxyserverkey.pem
PROXY_SERVER_CRED_COMBINED=proxyservercombined.pem
SERVER_CRED_CERT=servercert.pem
SERVER_CRED_KEY=serverkey.pem
SERVER_CRED_COMBINED=servercombined.pem
BACKEND_SERVER=http://localhost:8001
```
- client
```
// examples
PORT=8001
SERVER_CRED_CERT=servercert.pem
SERVER_CRED_KEY=serverkey.pem
SERVER_CRED_COMBINED=servercombined.pem
INITIAL_USER=Username
INITIAL_USER_PSWD=Password
INITIAL_USER_EMAIL=example@domain.com
TOKEN_KEY=RiTXjIms4ayd5Xk16ivu4b4/BiJW8LTsh4jVgzzGJEku5+CnAoCYoO26+Tkk/9tbYpUJGzwyUrxAJOgg6Rj03stY/EMaBo5lWaDaqUPOMuuCmVIBkL2Imlqe23/B0HchqG86ksRzG/YFc7CpszW4Gq2jXq3yO9Ps5oRgc5UpXx0
```

# Commands To Setup and Run Project
- Pre-requirements
  - nodejs is installed
  - git is installed and supported by your CLI (command line interface)
- open your CLI and change directory to where you want to store the project.
- `git clone https://github.com/jamespagedev/reactjs-with-socketio.git`
- install
  - (windows) `npm run devfullinstall`
    - Note: I haven't tested this yet with other OS computers.
- run project
  - (windows) `npm run devfullstart`
    - Note: I haven't tested this yet with other OS computers.

# Commands To Setup Database
Note: I recommend using SQLiteStudio to view the database db3 file. Also, if you ran the command `npm run devfullinstall`, the database has already been setup in project_location/server/data/database/dev.db3.
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