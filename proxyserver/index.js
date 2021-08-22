/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/
require('dotenv').config();
const proxyServer = require('./proxyServer.js');

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
// const { httpsOptions, https } = require('./config/middleware/middleware.js');
const { axios, Server, createServer, routerNames } = require('./config/middleware/middleware.js');

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
// const httpsProxyServer = https.createServer(httpsOptions, proxyServer);
// const port = process.env.PROXY_PORT || 5443;
// httpsProxyServer.listen(port, () => console.log(`\n=== Web API Listening on https://localhost:${port} ===\n`));
const httpProxyServer = createServer(proxyServer);
const port = process.env.PROXY_PORT || 5001;
httpProxyServer.listen(port, () => console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`));

const io = new Server(httpProxyServer, {
  cors: true,
  origins: ['http://localhost:3000']
});

io.on('connection', (socket) => {
  // console.log('socket.id:', socket.id);
  socket.on('socket_channel', (channelId) => {
    // channelId === todosUserId
    socket.join(channelId); // creates shared socket channel for all users on the site looking at the specific user todos.
  });

  socket.on('add_todo', async(res, cb) => {
    try{
      const headers = { headers: {Authorization: `${socket.handshake.headers.requestoruserid} ${socket.handshake.headers.token}`} }
      const backendSendToDoRes = await axios.post(`${process.env.BACKEND_SERVER}/${routerNames.todos}/addToDoForUser/${res.toDoUserId}`, res.data, headers);
      if(backendSendToDoRes.status !== 201){
        const errDetails = {code: 400, uniqueMessage: 'invalid username/password'};
        throw { errDetails };
      }
      const backendGetToDosRes = await axios.get(`${process.env.BACKEND_SERVER}/${routerNames.todos}/getAllUserTodos/${res.toDoUserId}`, headers);
      socket.to(res.toDoUserId).emit('update_todos', backendGetToDosRes.data);
      cb(backendGetToDosRes.data);
    } catch(err) {
      (err.errDetails) ? console.log('err.errDetails:', err.errDetails) : console.log('err:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected')
  });
});