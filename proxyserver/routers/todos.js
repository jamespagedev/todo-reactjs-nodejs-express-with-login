/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
const { axios, router, proxyRouterNames, backendRoutes } = require('../config/middleware/middleware.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/
const { authenticate } = require('../config/middleware/auth.js');

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
router.get(`/${proxyRouterNames.todos}/getAllUserTodos/:todoUserId`, authenticate, async(req, frontendRes, next) => {
  try {
    const todoUserId = req.params.todoUserId;
    const headers = { headers: {Authorization: req.get('Authorization')} }

    const backendRes = await axios.get(`${process.env.BACKEND_SERVER}/${backendRoutes.getToDosForUserByUserId}/${todoUserId}`, headers);
    frontendRes.status(200).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.get(`/${proxyRouterNames.todos}/getToDo/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    const toDoId = req.params.toDoId;
    const headers = { headers: {Authorization: req.get('Authorization')} }

    const backendRes = await axios.get(`${process.env.BACKEND_SERVER}/${backendRoutes.getToDoForUserByToDoId}/${toDoId}`, headers);
    frontendRes.status(200).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.post(`/${proxyRouterNames.todos}/addToDoForUser/:todoUserId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const todoUserId = req.params.todoUserId;
    const headers = { headers: {Authorization: req.get('Authorization')} }
    const data = {
      details: req.body.details
    };

    const backendRes = await axios.post(`${process.env.BACKEND_SERVER}/${backendRoutes.addToDoForUserByUserId}/${todoUserId}`, data, headers);
    frontendRes.status(201).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put(`/${proxyRouterNames.todos}/editToDoReturnId/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const toDoId = req.params.toDoId;
    const headers = { headers: {Authorization: req.get('Authorization')} }
    const data = {
      details: req.body.details
    };

    const backendRes = await axios.put(`${process.env.BACKEND_SERVER}/${backendRoutes.editToDoForUserByToDoIdReturnToDoId}/editToDoReturnId/${toDoId}`, data, headers);
    frontendRes.status(202).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put(`/${proxyRouterNames.todos}/editToDoReturnToDo/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const toDoId = req.params.toDoId;
    const headers = { headers: {Authorization: req.get('Authorization')} }
    const data = {
      details: req.body.details
    };

    const backendRes = await axios.put(`${process.env.BACKEND_SERVER}/${backendRoutes.editToDoForUserByToDoIdReturnToDo}/${toDoId}`, data, headers);
    frontendRes.status(202).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.delete(`/${proxyRouterNames.todos}/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const toDoId = req.params.toDoId;
    const headers = { headers: {Authorization: req.get('Authorization')} }

    const backendRes = await axios.delete(`${process.env.BACKEND_SERVER}/${backendRoutes.delToDoForUserByToDoId}/${toDoId}`, headers);
    frontendRes.status(200).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;