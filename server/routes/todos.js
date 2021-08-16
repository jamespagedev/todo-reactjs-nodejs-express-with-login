/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
const { router, routerNames } = require('../config/middleware/middleware.js');
const todosQueries = require('../data/database/queries/todos.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/
const { userToDos } = require('../data/dummydata/index.js'); // ToDo: remove and replace with database
const { authHeaderUserIdIndex, authenticate } = require('../config/middleware/auth.js');

/*=======================================================*/
/*====================== endpoints ======================*/
/*=======================================================*/
router.get(`${routerNames.todos}/:userId`, authenticate, async(req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const todos = await todosQueries.getUserToDosById(userId);
    if(!todos) {
      const errDetails = {code: 400, uniqueMessage: `no todos found for user id: ${userId}`};
      throw { errDetails };
    }
    res.status(200).json(todos);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.get(`${routerNames.todos}/:userId/:toDoId`, authenticate, async(req, res, next) => {
  try {//getUserToDoByUserIdToDoId
    const userId = Number(req.params.userId);
    const toDoId = Number(req.params.toDoId);
    const todo = await todosQueries.getUserToDoByUserIdToDoId(userId, toDoId);
    if(!todo) {
      const errDetails = {code: 400, uniqueMessage: `no todos found for user id: ${userId}, todo id: ${toDoId}`};
      throw { errDetails };
    }

    res.status(200).json(todo);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.post(`${routerNames.todos}/:todoUserId`, authenticate, async(req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if(!authHeader || authHeader === undefined || authHeader.split(" ").length < 2)
    {
      const errDetails = {code: 401, uniqueMessage: 'invalid authorization found in headers'};
      throw { errDetails };
    }
    const userId = Number(authHeader.split(' ')[authHeaderUserIdIndex]);
    console.log('userId:', userId);
    // ToDo: Validation
    const todoUserId = Number(req.params.todoUserId);
    const details = req.body.details;
    const newToDoId = await todosQueries.insertUserToDoReturnsToDoId(todoUserId, userId, details);

    res.status(201).json(newToDoId);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put(`${routerNames.todos}/editToDoReturnId/:userId/:toDoId`, authenticate, async(req, res, next) => {
  try {
    // ToDo: Validation
    const userId = Number(req.params.userId);
    const toDoId = Number(req.params.toDoId);
    const details = req.body.details;
    const toDoIdIndex = userToDos[userId].findIndex(todo => todo.id === toDoId);
    if(toDoIdIndex > -1) {
      userToDos[userId][toDoIdIndex].details = details;
    } else {
      const errDetails = {code: 400, uniqueMessage: 'todo not found'};
      throw { errDetails };
    }

    res.status(202).json(toDoId);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put(`${routerNames.todos}/editToDoReturnToDo/:userId/:toDoId`, authenticate, async(req, res, next) => {
  try {
    // ToDo: Validation
    const userId = Number(req.params.userId);
    const toDoId = Number(req.params.toDoId);
    const details = req.body.details;
    const toDoIdIndex = userToDos[userId].findIndex(todo => todo.id === toDoId);
    if(toDoIdIndex > -1) {
      userToDos[userId][toDoIdIndex].details = details;
    } else {
      const errDetails = {code: 400, uniqueMessage: 'todo not found'};
      throw { errDetails };
    }

    res.status(202).json(userToDos[userId][toDoIdIndex]);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.delete(`${routerNames.todos}/:userId/:toDoId`, authenticate, async(req, res, next) => {
  try {
    // ToDo: Validation
    const userId = Number(req.params.userId);
    const toDoId = Number(req.params.toDoId);
    const toDoIdIndex = userToDos[userId].findIndex(todo => todo.id === toDoId);
    if(toDoIdIndex > -1) {
      userToDos[userId].splice(toDoIdIndex, 1);
    } else {
      const errDetails = {code: 400, uniqueMessage: 'todo not found'};
      throw { errDetails };
    }

    res.status(200).json(toDoId);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;