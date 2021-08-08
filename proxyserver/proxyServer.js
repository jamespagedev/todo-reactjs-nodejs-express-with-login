/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
const { express } = require('./config/middleware/middleware.js');
const proxyServer = express();
proxyServer.use(helmet()); // hides your tech stack from sniffers
proxyServer.use(express.json()); // built-in
proxyServer.use(morgan('dev')); // logging middleware for console
proxyServer.use(cors()); // allows specified/all domains/ports to connect to your server
const { errorHandler } = require('./config/middleware/errorHandler.js');

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
const {
  users
} = require('./routes/index.js');

proxyServer.get('/', (req, res) => {
  res.status(200).send('This is the proxy server');
});

/*---------------------- endpoints ----------------------*/
proxyServer.use('/users', users);

/*-------------------- error handler --------------------*/
proxyServer.use(errorHandler); // This line must be after all endpoints

/*-------------------- export routes --------------------*/
module.exports = proxyServer;