const lang = require('../lang');
const {
  fail,
  logger,
  verifyToken
} = require('../utils');

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token?.split(' ').pop();
    const decoded = verifyToken(token);
    req.auth = decoded.data;
    next();
  } catch (error) {
    logger('Error Token', error);
    return fail(res, lang('auth.unverify'), 401);
  }
}
