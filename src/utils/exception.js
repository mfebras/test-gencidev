const { fail } = require('./response');
const { logger } = require('./logger');

exports.errorHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  logger('Internal Server Error', error.stack || error);

  return fail(res, error, 500);
}
