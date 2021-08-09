const getNewToken = async(userId) => {
  return "sadfhnjlksdaf";
}

const authenticate = (req, res, next) => {
  // ToDo: if userId or token not provided, throw err
  // ToDo: if userId and token missmatch, throw err
  next();
}

module.exports = {
  getNewToken,
  authenticate
}