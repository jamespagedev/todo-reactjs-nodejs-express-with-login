/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
// const { httpsAgent, router } = require('../config/middleware/middleware.js');
const { axios, router, routeNames } = require('../config/middleware/middleware.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
router.post(`/${routeNames.users}/login`, async(req, frontendRes, next) => {
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