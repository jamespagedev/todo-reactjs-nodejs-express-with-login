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
const server = express();
server.use(helmet()); // hides your tech stack from sniffers
server.use(express.json()); // built-in
server.use(morgan('dev')); // logging middleware for console
server.use(cors()); // allows specified/all domains/ports to connect to your server
const { errorHandler } = require('./config/middleware/errorHandler.js');

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
const {
  todosRoute,
  usersRoute
} = require('./routes/index.js');

/*---------------------- endpoints ----------------------*/
server.get('/', (req, res) => {
  res.status(200).send('This is the back-end server');
});

server.use(todosRoute);
server.use(usersRoute);

/*-------------------- error handler --------------------*/
server.use(errorHandler); // This line must be after all endpoints

/*-------------------- export routes --------------------*/
module.exports = server;