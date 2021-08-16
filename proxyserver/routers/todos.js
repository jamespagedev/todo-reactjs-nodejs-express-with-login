/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
const { axios, router, routerNames } = require('../config/middleware/middleware.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/
const { authenticate } = require('../config/middleware/auth.js');

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
router.get(`${routerNames.todos}/:userId`, authenticate, async(req, frontendRes, next) => {
  try {
    const userId = req.params.userId;

    const backendRes = await axios.get(`${process.env.BACKEND_SERVER}/todos/${userId}`);
    frontendRes.status(200).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.get(`${routerNames.todos}/:userId/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    const userId = req.params.userId;
    const toDoId = req.params.toDoId;

    const backendRes = await axios.get(`${process.env.BACKEND_SERVER}/todos/${userId}/${toDoId}`);
    frontendRes.status(200).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.post(`${routerNames.todos}/:userId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const userId = req.params.userId;
    const headers = { headers: {Authorization: req.get('Authorization')} }
    const data = {
      details: req.body.details
    };

    const backendRes = await axios.post(`${process.env.BACKEND_SERVER}/todos/${userId}`, data, headers);
    frontendRes.status(201).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put(`${routerNames.todos}/editToDoReturnId/:userId/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const userId = req.params.userId;
    const toDoId = req.params.toDoId;
    const data = {
      details: req.body.details
    };

    const backendRes = await axios.put(`${process.env.BACKEND_SERVER}/todos/editToDoReturnId/${userId}/${toDoId}`, data);
    frontendRes.status(202).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put(`${routerNames.todos}/editToDoReturnToDo/:userId/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const userId = req.params.userId;
    const toDoId = req.params.toDoId;
    const data = {
      details: req.body.details
    };

    const backendRes = await axios.put(`${process.env.BACKEND_SERVER}/todos/editToDoReturnToDo/${userId}/${toDoId}`, data);
    frontendRes.status(202).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.delete(`${routerNames.todos}/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const toDoId = req.params.toDoId;

    const backendRes = await axios.delete(`${process.env.BACKEND_SERVER}/todos/${toDoId}`);
    frontendRes.status(200).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;