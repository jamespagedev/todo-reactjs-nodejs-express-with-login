const jwt = require('jsonwebtoken');
const { numOfTokenHandshakeHashes, userTypeIds } = require('./globals.js');
const { bcrypt } = require('./middleware.js');
const todosQueries = require('../../data/database/queries/todos.js');
const userQueries = require('../../data/database/queries/users.js');

const authHeaderUserIdIndex = 0;
const authHeaderTokenIndex = 1;

const getNewToken = async(userId, tokenHandshake) => {
  const tokenProperties = {
    userId: userId,
    tokenHashedHandshake: bcrypt.hashSync(tokenHandshake, numOfTokenHandshakeHashes)
  };

  const tokenKey =
    process.env.TOKEN_KEY ||
    'Should configure local .env file for tokenKey'; // hard coding this in the code is bad practice

  const tokenOptions = {
    expiresIn: '1d' // otherValues(20s, '2 days', '10h', '7d'), a number(not string) represents in milliseconds
  };

  return jwt.sign(tokenProperties, tokenKey, tokenOptions);
}

const getTokenStatus = async(token) => {
  try {
  let tokenProperties;

  const tokenKey =
    process.env.TOKEN_KEY ||
    'Should configure local .env file for tokenKey'; // hard coding this in the code is bad practice

  await jwt.verify(token, tokenKey, {ignoreExpiration: true}, (err, decodedToken) => {
    if (err) {
      throw { err };
    } else {
      tokenProperties = decodedToken;
    }
  });
  return tokenProperties;
  } catch(err) {
    return {isInvalid: true,  error: err.err, errName: err.err.name, errMsg: err.err.message};
  }
}

const isTokenExpWithinRefreshDays = (timeNow, timeTokenExp, timeTokenRefreshGracePeriod) => {
  return (timeNow - timeTokenRefreshGracePeriod) <= timeTokenExp;
}

const authenticate = async(req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if(!authHeader || authHeader === undefined || authHeader.split(" ").length < 2) {
      const errDetails = {code: 401, uniqueMessage: 'authentication failed'};
      throw { errDetails };
    }
    const userId = Number(authHeader.split(" ")[authHeaderUserIdIndex]);
    const token = authHeader.split(" ")[authHeaderTokenIndex];
    const tokenPayload = await getTokenStatus(token);
    const timeNow = new Date().getTime();
    const timeTokenExp = tokenPayload.exp * 1000;
    if(userId !== tokenPayload.userId) {
      const errDetails = {code: 401, uniqueMessage: 'authentication failed'};
      throw { errDetails };
    }
    if(timeNow > timeTokenExp) {
      const errDetails = {code: 401, uniqueMessage: 'token expired'};
      throw { errDetails };
    }
    next();
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
}

const isToDoIdOwnerOrAdmin = async(req, res, next) => {
  try{
    const authHeader = req.get('Authorization');
    const requestorUserId = Number(authHeader.split(" ")[authHeaderUserIdIndex]);
    const toDoId = Number(req.params.toDoId);
    const toDoUserId = await todosQueries.getToDoUserIdByToDoId(toDoId);
    if(toDoUserId === requestorUserId) {
      next(); // requestor is todo owner
    } else {
      const requestorUserTypeId = await userQueries.getUserTypeIdByUserId(requestorUserId);
      if(requestorUserTypeId !== userTypeIds.admin) {
        const errDetails = {code: 403, uniqueMessage: `access denied`};
        throw { errDetails };
      }
      next(); // requestor is admin
    }
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
}

const isToDoUserIdOwnerOrAdmin = async(req, res, next) => {
  try{
    const authHeader = req.get('Authorization');
    const requestorUserId = Number(authHeader.split(" ")[authHeaderUserIdIndex]);
    const todoUserId = Number(req.params.todoUserId);
    if(todoUserId === requestorUserId) {
      next(); // requestor is todo owner
    } else {
      const requestorUserTypeId = await userQueries.getUserTypeIdByUserId(requestorUserId);
      if(requestorUserTypeId !== userTypeIds.admin) {
        const errDetails = {code: 403, uniqueMessage: `access denied`};
        throw { errDetails };
      }
      next(); // requestor is admin
    }
  } catch(err) {
    (err.errDetails) ? next(err.errDetails) : next(err);
  }
}

module.exports = {
  authHeaderUserIdIndex,
  authHeaderTokenIndex,
  getNewToken,
  getTokenStatus,
  isTokenExpWithinRefreshDays,
  authenticate,
  isToDoIdOwnerOrAdmin,
  isToDoUserIdOwnerOrAdmin
}