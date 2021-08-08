/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/
require('dotenv').config();
const server = require('./server.js');

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
// const { httpsOptions, https } = require('./config/middleware/middleware.js');
const { createServer } = require('./config/middleware/middleware.js');

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
// const httpsServer = https.createServer(httpsOptions, server);
// const port = process.env.PORT || 8443;
// httpsServer.listen(port, () => console.log(`\n=== Web API Listening on https://localhost:${port} ===\n`));
const httpServer = createServer(server);
const port = process.env.PORT || 8001;
httpServer.listen(port, () => console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`));