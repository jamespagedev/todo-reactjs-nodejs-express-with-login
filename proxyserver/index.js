/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/
require('dotenv').config();
const proxyServer = require('./proxyServer.js');

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
// const { httpsOptions, https } = require('./config/middleware/middleware.js');
const { createServer } = require('./config/middleware/middleware.js');

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
// const httpsProxyServer = https.createServer(httpsOptions, proxyServer);
// const port = process.env.PROXY_PORT || 5443;
// httpsProxyServer.listen(port, () => console.log(`\n=== Web API Listening on https://localhost:${port} ===\n`));
const httpProxyServer = createServer(proxyServer);
const port = process.env.PROXY_PORT || 5001;
httpProxyServer.listen(port, () => console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`));