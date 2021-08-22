/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
const { bcrypt, router, routerNames } = require('../config/middleware/middleware.js');
const usersQueries = require('../data/database/queries/users.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/
const { getNewToken, getTokenStatus, isTokenExpWithinRefreshDays } = require('../config/middleware/auth.js');

/*=======================================================*/
/*====================== endpoints ======================*/
/*=======================================================*/
router.get(`/${routerNames.users}/silentLogin`, async(req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      const errDetails = {code: 401, uniqueMessage: 'token not found'};
      throw { errDetails };
    }
    const tokenStatus = await getTokenStatus(token);
    const userInfo = await usersQueries.getUserInfoById(tokenStatus.userId);
    if(!userInfo || !bcrypt.compareSync(userInfo.token_handshake, tokenStatus.tokenHashedHandshake)) {
      const errDetails = {code: 400, uniqueMessage: 'invalid token'};
      throw { errDetails };
    }
    const timeNow = new Date().getTime();
    const timeTokenExp = tokenStatus.exp * 1000;
    const timeTokenRefreshGracePeriod = 60 * (24 * (60 * (60 * 1000))); // numOfDays (24hours (60minutes (60seconds))) = 60days
    if(timeNow > (timeTokenExp)) { // token is expired
      if(!isTokenExpWithinRefreshDays(timeNow, timeTokenExp, timeTokenRefreshGracePeriod)) {
        const errDetails = {code: 400, uniqueMessage: 'token expired'};
        throw { errDetails };
      }
      const newToken = await getNewToken(userInfo.id, userInfo.token_handshake);
      res.status(200).json({id: userInfo.id, name: userInfo.username, token: newToken, isNewToken: true});
    } else { // token is not expired
      res.status(200).json({id: userInfo.id, name: userInfo.username, token: token, isNewToken: false});
    }
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.post(`/${routerNames.users}/login`, async(req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.pswd;
    if(!userName || userName === undefined || userName === null || userName === '' ||
        !password || password === undefined || password === null || password === ''
    ) {
      const errDetails = {code: 400, uniqueMessage: 'invalid username/password'};
      throw { errDetails };
    }
    const userInfo = await usersQueries.getUserInfoByUsername(userName);
    if(!userInfo || !bcrypt.compareSync(password, userInfo.hashed_pswd)) {
      const errDetails = {code: 400, uniqueMessage: 'invalid username/password'};
      throw { errDetails };
    }

    const token = await getNewToken(userInfo.id, userInfo.token_handshake);
    res.status(201).json({id: userInfo.id, name: userInfo.username, token: token});
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;