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
const { getNewToken, getTokenStatus, isTokenExpWithinRefreshDays } = require('../config/middleware/auth.js');

/*=======================================================*/
/*====================== endpoints ======================*/
/*=======================================================*/
router.get(`${routerNames.users}/silentLogin`, async(req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      const errDetails = {code: 401, uniqueMessage: 'token not found'};
      throw { errDetails };
    }
    const tokenStatus = await getTokenStatus(token);
    /* ToDo:  once validation is added with password stored as hash key in a database,
              replace (userIndex = users.findIndex(...)) with method to validate username/password,
              if (validation === true) then generate new token and give the front-end a response
    */
    const userIndex = users.findIndex(user => (user.userId === tokenStatus.userId));
    if(userIndex === -1) {
      const errDetails = {code: 400, uniqueMessage: 'invalid token'};
      throw { errDetails };
    }
    const timeNow = new Date().getTime();
    const timeTokenExp = tokenStatus.exp * 1000;
    const timeTokenRefreshGracePeriod = 60 * (24 * (60 * (60 * 1000))); // numOfDays (24hours (60minutes (60seconds)))
    if(timeNow > (timeTokenExp)) { // token is expired
      if(!isTokenExpWithinRefreshDays(timeNow, timeTokenExp, timeTokenRefreshGracePeriod)) {
        const errDetails = {code: 400, uniqueMessage: 'token expired'};
        throw { errDetails };
      }
      const newToken = await getNewToken(tokenStatus.userId);
      res.status(200).json({id: users[userIndex].userId, name: users[userIndex].userName, token: newToken, isNewToken: true});
    } else { // token is not expired
      res.status(200).json({id: users[userIndex].userId, name: users[userIndex].userName, token: token, isNewToken: false});
    }
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

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

    const token = await getNewToken(users[userIndex].userId);
    res.status(201).json({id: users[userIndex].userId, name: users[userIndex].userName, token: token});
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;