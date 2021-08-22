/*=======================================================*/
/*===================== dependencies ====================*/
/*=======================================================*/

/*=======================================================*/
/*====================== middleware =====================*/
/*=======================================================*/
// const { axios, httpsAgent, router, proxyRouterNames, backendRoutes } = require('../config/middleware/middleware.js');
const { axios, router, proxyRouterNames, backendRoutes } = require('../config/middleware/middleware.js');

/*=======================================================*/
/*==================== Authorization ====================*/
/*=======================================================*/

/*=======================================================*/
/*======================== routes =======================*/
/*=======================================================*/
router.post(`/${proxyRouterNames.users}/login`, async(req, frontendRes, next) => {
  try {
    const data = req.body;
    if (!data.userName || data.userName === undefined || data.userName === null || data.userName === '' ||
        !data.pswd || data.pswd === undefined || data.pswd === null || data.pswd === ''
    ){
      const errDetails = {code: 400, uniqueMessage: 'invalid username/password'};
      throw { errDetails };
    }
    /* Example on what to replace with once ssl certs and https is setup
    const backendRes = await axios.post(`${process.env.BACKEND_SERVER}/${backendRoutes.login}`, data, {
      httpsAgent: httpsAgent,
      headers: req.headers
    })
    frontendRes.status(201).json(backendRes.data);
    */
    const backendRes = await axios.post(`${process.env.BACKEND_SERVER}/${backendRoutes.login}`, data);
    frontendRes.status(201).json(backendRes.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

router.get(`/${proxyRouterNames.users}/silentLogin`, async(req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      const errDetails = {code: 401, uniqueMessage: 'token not found'};
      throw { errDetails };
    }
    const tokenStatus = await axios.get(`${process.env.BACKEND_SERVER}/${backendRoutes.silentLogin}`, { headers: {Authorization: token} });
    res.status(200).json(tokenStatus.data);
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
});

module.exports = router;