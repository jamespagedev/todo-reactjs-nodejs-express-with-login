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

const isToDoOwnerOrAdmin = (req, res, next) => {
  // ToDo: ensure the user is the owner of the ToDo, requires data lookup here.
  next();
}

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
    // const userId = Number(req.params.userId); // ToDo: use for authorization
    const toDoId = Number(req.params.toDoId);
    const todo = await todosQueries.getUserToDoByUserIdToDoId(toDoId);
    if(!todo) {
      const errDetails = {code: 400, uniqueMessage: `no todos found for todo id: ${toDoId}`};
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
    // ToDo: Validation
    const todoUserId = Number(req.params.todoUserId);
    const details = req.body.details;
    const newToDoId = await todosQueries.insertUserToDoReturnsToDoId(todoUserId, userId, details);

    res.status(201).json(newToDoId);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put(`${routerNames.todos}/editToDoReturnId/:toDoId`, authenticate, async(req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if(!authHeader || authHeader === undefined || authHeader.split(" ").length < 2)
    {
      const errDetails = {code: 401, uniqueMessage: 'invalid authorization found in headers'};
      throw { errDetails };
    }
    // ToDo: Validation
    const userId = Number(authHeader.split(' ')[authHeaderUserIdIndex]);
    const toDoId = Number(req.params.toDoId);
    const details = req.body.details;
    const updatedToDoId = await todosQueries.updateUserToDoReturnsToDoId(toDoId, userId, details);
    if(updatedToDoId < 1) {
      const errDetails = {code: 400, uniqueMessage: 'todo not found'};
      throw { errDetails };
    }

    res.status(202).json(updatedToDoId);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put(`${routerNames.todos}/editToDoReturnToDo/:toDoId`, authenticate, async(req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if(!authHeader || authHeader === undefined || authHeader.split(" ").length < 2)
    {
      const errDetails = {code: 401, uniqueMessage: 'invalid authorization found in headers'};
      throw { errDetails };
    }
    // ToDo: Validation
    const userId = Number(authHeader.split(' ')[authHeaderUserIdIndex]);
    const toDoId = Number(req.params.toDoId);
    const details = req.body.details;
    const updatedToDo = await todosQueries.updateUserToDoReturnsToDo(toDoId, userId, details);

    res.status(202).json(updatedToDo);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.delete(`${routerNames.todos}/:toDoId`, authenticate, isToDoOwnerOrAdmin, async(req, res, next) => {
  try {
    // ToDo: Validation
    const toDoId = Number(req.params.toDoId);
    const deletedToDoId = await todosQueries.deleteUserToDoReturnsTrue(toDoId);
    if(deletedToDoId < 1) {
      const errDetails = {code: 400, uniqueMessage: 'todo not found'};
      throw { errDetails };
    }

    res.status(200).json(deletedToDoId);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;