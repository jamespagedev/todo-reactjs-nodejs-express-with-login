const jwt = require('jsonwebtoken');
const { numOfTokenHandshakeHashes } = require('./globals.js');
const { bcrypt } = require('./middleware.js');

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

const authenticate = (req, res, next) => {
  // ToDo: if userId or token not provided, throw err
  // ToDo: if userId and token missmatch, throw err
  next();
}

module.exports = {
  authHeaderUserIdIndex,
  authHeaderTokenIndex,
  getNewToken,
  getTokenStatus,
  isTokenExpWithinRefreshDays,
  authenticate
}