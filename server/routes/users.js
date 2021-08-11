/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
const { router, routerNames } = require('../config/middleware/middleware.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/
const { users } = require('../data/index.js'); // ToDo: remove and replace with database
const { getNewToken } = require('../config/middleware/auth.js');

/*=======================================================*/
/*====================== endpoints ======================*/
/*=======================================================*/
router.post(`${routerNames.users}/login`, async(req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.pswd;
    if(!userName || userName === undefined || userName === null || userName === '' ||
        !password || password === undefined || password === null || password === ''
    ) {
      const errDetails = {code: 400, uniqueMessage: 'invalid username/password'};
      throw { errDetails };
    }
    /* ToDo:  once validation is added with password stored as hash key in a database,
              replace (userIndex = users.findIndex(...)) with method to validate username/password,
              if (validation === true) then generate new token and give the front-end a response
    */
    const userIndex = users.findIndex(user => (user.userName.toLowerCase() === userName.toLowerCase() && user.password === password));
    if(userIndex === -1) {
      const errDetails = {code: 400, uniqueMessage: 'invalid username/password'};
      throw { errDetails };
    }

    const token = await getNewToken();
    res.status(201).json({id: users[userIndex].userId, name: users[userIndex].userName, token: token});
    next();
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;