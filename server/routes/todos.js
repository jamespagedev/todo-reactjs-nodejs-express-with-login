/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
const { router, routerNames } = require('../config/middleware/middleware.js');
const todosQueries = require('../data/database/queries/todos.js');
const {
  authHeaderUserIdIndex, authenticate,
  isToDoIdOwnerOrAdmin, isToDoUserIdOwnerOrAdmin
} = require('../config/middleware/auth.js');

/*=======================================================*/
/*====================== Validation =====================*/
/*=======================================================*/
const isToDoValid = (req, res, next) => {
  try{
    const details = req.body.details;
    if(!details || details === undefined) {
      const errDetails = {code: 400, uniqueMessage: `todo is invalid`};
      throw { errDetails };
    }
    next()
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
}

/*=======================================================*/
/*====================== endpoints ======================*/
/*=======================================================*/
router.get(`/${routerNames.todos}/getAllUserTodos/:todoUserId`, authenticate, isToDoUserIdOwnerOrAdmin, async(req, res, next) => {
  try {
    const todoUserId = Number(req.params.todoUserId);
    const todos = await todosQueries.getUserToDosById(todoUserId);
    if(!todos) {
      const errDetails = {code: 400, uniqueMessage: `no todos found for user id: ${todoUserId}`};
      throw { errDetails };
    }
    res.status(200).json(todos);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.get(`/${routerNames.todos}/getToDo/:toDoId`, authenticate, isToDoIdOwnerOrAdmin, async(req, res, next) => {
  try {
    const toDoId = Number(req.params.toDoId);
    const todo = await todosQueries.getUserToDoByUserIdToDoId(toDoId);
    if(!todo) {
      const errDetails = {code: 400, uniqueMessage: `todo id: ${toDoId} not found`};
      throw { errDetails };
    }

    res.status(200).json(todo);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.post(`/${routerNames.todos}/addToDoForUser/:todoUserId`, authenticate, isToDoUserIdOwnerOrAdmin, isToDoValid, async(req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    const requestorUserId = Number(authHeader.split(' ')[authHeaderUserIdIndex]);
    const todoUserId = Number(req.params.todoUserId);
    const details = req.body.details;
    const newToDoId = await todosQueries.insertUserToDoReturnsToDoId(todoUserId, requestorUserId, details);

    res.status(201).json(newToDoId);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put(`/${routerNames.todos}/editToDoReturnId/:toDoId`, authenticate, isToDoIdOwnerOrAdmin, isToDoValid, async(req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
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

router.put(`/${routerNames.todos}/editToDoReturnToDo/:toDoId`, authenticate, isToDoIdOwnerOrAdmin, isToDoValid, async(req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    const userId = Number(authHeader.split(' ')[authHeaderUserIdIndex]);
    const toDoId = Number(req.params.toDoId);
    const details = req.body.details;
    const updatedToDo = await todosQueries.updateUserToDoReturnsToDo(toDoId, userId, details);

    res.status(202).json(updatedToDo);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.delete(`/${routerNames.todos}/:toDoId`, authenticate, isToDoIdOwnerOrAdmin, async(req, res, next) => {
  try {
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