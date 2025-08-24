const { validationResult } = require('express-validator');
const { fail } = require('./response');

exports.validatorFormat = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const validator = {};
    result.array().forEach((item) => {
      if (!validator[item.path]) {
        validator[item.path] = [];
      }
      validator[item.path].push(item.msg);
    })
    return fail(res, validator);
  }

  next();
}
