/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
const { router } = require('../config/middleware/middleware.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/
const { userToDos } = require('../data/index.js'); // ToDo: remove and replace with database
const { authenticate } = require('../config/middleware/auth.js');

/*=======================================================*/
/*====================== endpoints ======================*/
/*=======================================================*/
router.get('/:userId', authenticate, async(req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    res.status(200).json(userToDos[userId]);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.get('/:userId/:toDoId', authenticate, async(req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const toDoId = Number(req.params.toDoId);
    const toDoIdIndex = userToDos[userId].findIndex(todo => {
      return todo.id === toDoId
    });
    if(toDoIdIndex > -1) {
      res.status(200).json(userToDos[userId][toDoIdIndex]);
    } else {
      const errDetails = {code: 400, uniqueMessage: 'todo not found'};
      throw { errDetails };
    }
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.post('/:userId', authenticate, async(req, res, next) => {
  try {
    // ToDo: Validation
    const userId = Number(req.params.userId);
    const details = req.body.details;
    const newToDo = {
      id: userToDos[userId].length === 0 ? 1 : userToDos[userId][userToDos[userId].length - 1].id + 1,
      details: details
    }
    userToDos[userId].push(newToDo);

    res.status(201).json(newToDo.id);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put('/:userId/:toDoId', authenticate, async(req, res, next) => {
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

router.delete('/:userId/:toDoId', authenticate, async(req, res, next) => {
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