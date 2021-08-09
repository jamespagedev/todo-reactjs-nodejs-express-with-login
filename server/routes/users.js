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
const { users } = require('../data/index.js'); // ToDo: remove and replace with database
const { getNewToken } = require('../config/middleware/auth.js');

/*=======================================================*/
/*====================== endpoints ======================*/
/*=======================================================*/
router.post('/login', async(req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.pswd;
    if(!userName || userName === undefined || userName === null || userName === '' ||
        !password || password === undefined || password === null || password === ''
    ) {
      const errDetails = {code: 400, uniqueMessage: 'invalid username/password'};
      throw { errDetails };
    }
    const userIndex = users.findIndex(user => user.userName.toLowerCase() === userName.toLowerCase());
    if(userIndex === -1) {
      const errDetails = {code: 400, uniqueMessage: 'invalid username/password'};
      throw { errDetails };
    }

    const token = await getNewToken();
    res.status(201).json({id: 1, name: userName, token: token});
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;