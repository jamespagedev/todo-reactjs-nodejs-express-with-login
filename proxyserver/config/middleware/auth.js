const authenticate = (req, res, next) => {
  // ToDo: if userId or token not provided, throw err
  // ToDo: if userId and token missmatch, throw err, use backend http request to confirm token validity
  next();
}

module.exports = {
  authenticate
}