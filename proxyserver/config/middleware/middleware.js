/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/
require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { createServer } = require('http'); // use this until certs are created to replace for https
// const fs = require('fs');
// const https = require('https');

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
// const currentDir = __dirname.replace(/\\/g, "/");
// const httpsOptions = {
//   cert: fs.readFileSync(`${currentDir}/../crtssl/${process.env.PROXY_SERVER_CRED_CERT}`, 'utf8'),
//   key: fs.readFileSync(`${currentDir}/../crtssl/${process.env.PROXY_SERVER_CRED_KEY}`, 'utf8')
// }
// const httpsAgent = new https.Agent({
//   ca: fs.readFileSync(`${currentDir}/../crtssl/${process.env.PROXY_SERVER_CRED_COMBINED}`, 'utf8'),
//   keepAlive: true,
//   rejectUnauthorized: false
// });
const cacheUserTokenInfo = {};
const authHeadersUserIdIndex = 0;
const authHeadersTokenIndex = 1;
const routerNames = {
  todos: '/todos',
  users: '/users'
}

module.exports = {
  express,
  router,
  axios,
  createServer, // use this until certs are created to replace for https
  // https,
  // httpsOptions,
  // httpsAgent,
  cacheUserTokenInfo,
  authHeadersUserIdIndex,
  authHeadersTokenIndex,
  routerNames
}