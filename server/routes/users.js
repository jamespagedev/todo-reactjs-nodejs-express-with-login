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

/*=======================================================*/
/*====================== endpoints ======================*/
/*=======================================================*/
router.post('/login', async(req, res, next) => {
  try {
    if (!req.body.userName || req.body.userName === undefined || req.body.userName === null || req.body.userName === '' ||
        !req.body.pswd || req.body.pswd === undefined || req.body.pswd === null || req.body.pswd === ''
    ){
      const errDetails = {code: 400, uniqueMessage: 'invalid username/password'};
      throw { errDetails };
    }
    res.status(201).json({id: 1, name: req.body.userName, token: "asdfdsf"});
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;