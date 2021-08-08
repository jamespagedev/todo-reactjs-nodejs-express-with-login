/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
// const { httpsAgent, router } = require('../config/middleware/middleware.js');
const { axios, router } = require('../config/middleware/middleware.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== endpoints ======================*/
/*=======================================================*/
router.post('/login', async(req, res, next) => {
  try {
    const data = req.body;
    if (!data.userName || data.userName === undefined || data.userName === null || data.userName === '' ||
        !data.pswd || data.pswd === undefined || data.pswd === null || data.pswd === ''
    ){
      const errDetails = {code: 400, uniqueMessage: 'invalid username/password'};
      throw { errDetails };
    }
    // axios.post(process.env.BACKEND_SERVER, data, {
    //   httpsAgent: httpsAgent,
    //   headers: req.headers
    // })
    // .then(serverRes => res.status(201).json(serverRes.data))
    // .catch(err => {
    //   throw err;
    // });
    axios.post(`${process.env.BACKEND_SERVER}/users/login`, data)
    .then(serverRes => res.status(201).json(serverRes.data))
    .catch(err => {
      throw err;
    });
    // res.status(201).json({id: 1, name: req.body.userName, token: "asdfdsf"});
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;