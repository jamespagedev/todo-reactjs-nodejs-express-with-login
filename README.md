# todo-reactjs-nodejs-express-with-login
out of the box react, nodejs, express, with proxy, certs, authentication... to be tested with multiple libraries

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