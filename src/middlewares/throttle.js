const rateLimit = require('express-rate-limit');
const lang = require('../lang');
const { fail } = require('../utils');

module.exports = (max = 60) => {
  return rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max, // Limit max request per windowMs
    keyGenerator: (req, res) => req.ip + req.originalUrl,
    message: lang('rate_limiter'),
    handler: (_req, res, _next, options) => {
      fail(res, options.message, 429);
    }
  });
}
