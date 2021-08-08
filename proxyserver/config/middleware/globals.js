/*=======================================================*/
/*====================== Variables ======================*/
/*=======================================================*/

/*=======================================================*/
/*====================== Functions ======================*/
/*=======================================================*/
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

module.exports = {
  cloneObjByValue
}