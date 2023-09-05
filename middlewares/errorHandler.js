const { ERRORHANDLER_MESSAGE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? ERRORHANDLER_MESSAGE
        : message,
    });

  next();
};

module.exports = errorHandler;
