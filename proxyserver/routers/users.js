/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
// const { httpsAgent, router } = require('../config/middleware/middleware.js');
const { axios, router, routerNames } = require('../config/middleware/middleware.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
router.get(`${routerNames.users}/silentLogin`, async(req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      const errDetails = {code: 401, uniqueMessage: 'token not found'};
      throw { errDetails };
    }
    const tokenStatus = await axios.get(`${process.env.BACKEND_SERVER}/users/silentLogin`, { headers: {Authorization: token} });
    console.log('tokenStatus.data: ', tokenStatus.data);
    res.status(200).json(tokenStatus.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
  
});

router.post(`${routerNames.users}/login`, async(req, frontendRes, next) => {
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
    // .then(backendRes => frontendRes.status(201).json(backendRes.data))
    // .catch(err => {
    //   throw err;
    // });
    const backendRes = await axios.post(`${process.env.BACKEND_SERVER}/users/login`, data);
    frontendRes.status(201).json(backendRes.data);
  } catch(err) {
    // console.log(err.response.data);
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;