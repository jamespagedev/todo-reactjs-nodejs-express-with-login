const errorHandler = (err, req, res, next) => {
  switch (err.code) {
    case 400:
      return res.status(400).json({
        code: 400,
        message: 'Bad Request',
        detail: err.detail,
        error: (err.uniqueMessage) ? `${err.uniqueMessage}` : `${err}`
      });
    case 401:
      return res.status(401).json({
        code: 401,
        message: 'You are unauthorized to view the content',
        detail: err.detail,
        error: (err.uniqueMessage) ? `${err.uniqueMessage}` : `${err}`
      });
    case 403:
      return res.status(403).json({
        code: 403,
        message: 'Forbidden: Access Denied',
        detail: err.detail,
        error: (err.uniqueMessage) ? `${err.uniqueMessage}` : `${err}`
      });
    case 404:
      return res.status(404).json({
        code: 404,
        message: 'Not Found',
        detail: err.detail,
        error: (err.uniqueMessage) ? `${err.uniqueMessage}` : `${err}`
      });
    default:
      return res.status(500).json({
        code: 500,
        message: 'There was an error performing the required operation',
        detail: err.detail,
        error: (err.uniqueMessage) ? `${err.uniqueMessage}` : `${err}`
      });
  }
}

module.exports = {
  errorHandler
}