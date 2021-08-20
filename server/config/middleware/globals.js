/*=======================================================*/
/*====================== Variables ======================*/
/*=======================================================*/
const userTypeIds = {
  guest: 0,
  user: 1,
  admin: 2
}
const userStatusIds = {
  banned: 0,
  active: 1,
  inactive: 2
}
const numOfHashes = 10;
const numOfTokenHandshakeHashes = 6;
const tokenHandshakeLength = 8;

/*=======================================================*/
/*====================== Functions ======================*/
/*=======================================================*/
const isObjectEmpty = (obj) => {
  return obj.constructor === Object && Object.keys(obj).length === 0;
}

const cloneObjByValue = (obj) => {
  let cloneValue;

  // handle the primitive data types, and null/undefined
  if(null === obj || "object" !== typeof obj) return obj;

  // handle date
  if(obj instanceof Date) {
    cloneValue = new Date();
    cloneValue.setTime(obj.getTime());
    return cloneValue;
  }

  // handle array
  if(obj instanceof Array) {
    cloneValue = [];
    for (let i = 0; i < obj.length; i++) {
      cloneValue[i] = cloneObjByValue(obj[i]);
    }
    return cloneValue;
  }

  // handle object
  if(obj instanceof Object) {
    cloneValue = {};
    for(let attr in obj) {
      if(obj.hasOwnProperty(attr)) cloneValue[attr] = cloneObjByValue(obj[attr]);
    }
    return cloneValue;
  }
  throw new Error('Unable to clone object by value! Object value type is not supported');
}

const generateTokenHandshake = (strLength) => {
  let tokenHandshake = '';
  let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+';
  for (let i = 0; i < strLength; i++) {
    tokenHandshake += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return tokenHandshake;
}

module.exports = {
  // variables
  userTypeIds,
  userStatusIds,
  numOfHashes,
  numOfTokenHandshakeHashes,
  tokenHandshakeLength,

  // functions
  isObjectEmpty,
  cloneObjByValue,
  generateTokenHandshake
}