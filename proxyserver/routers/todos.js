/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
const { axios, router, routeNames } = require('../config/middleware/middleware.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/
const { authenticate } = require('../config/middleware/auth.js');

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
router.get(`/${routeNames.todos}/:userId`, authenticate, async(req, frontendRes, next) => {
  try {
    const userId = req.params.userId;

    const backendRes = await axios.get(`${process.env.BACKEND_SERVER}/todos/${userId}`);
    frontendRes.status(200).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.get(`/${routeNames.todos}/:userId/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    const userId = req.params.userId;
    const toDoId = req.params.toDoId;

    const backendRes = await axios.get(`${process.env.BACKEND_SERVER}/todos/${userId}/${toDoId}`);
    frontendRes.status(200).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.post(`/${routeNames.todos}/:userId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const userId = req.params.userId;
    const data = {
      details: req.body.details
    };

    const backendRes = await axios.post(`${process.env.BACKEND_SERVER}/todos/${userId}`, data);
    frontendRes.status(201).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.put(`/${routeNames.todos}/:userId/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const userId = req.params.userId;
    const toDoId = req.params.toDoId;
    const data = {
      details: req.body.details
    };

    const backendRes = await axios.put(`${process.env.BACKEND_SERVER}/todos/${userId}/${toDoId}`, data);
    frontendRes.status(202).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.delete(`/${routeNames.todos}/:userId/:toDoId`, authenticate, async(req, frontendRes, next) => {
  try {
    // ToDo: Validation
    const userId = req.params.userId;
    const toDoId = req.params.toDoId;

    const backendRes = await axios.delete(`${process.env.BACKEND_SERVER}/todos/${userId}/${toDoId}`, data);
    frontendRes.status(200).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;