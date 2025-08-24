const { check } = require('express-validator');
const lang = require('../../lang');
const { validatorFormat } = require('../../utils');

exports.storeValidation = [
  check('title')
    .trim()
    .notEmpty()
    .withMessage(() => lang('validator.required', { field: lang('field.title') }))
    .bail()
    .isLength({ max: 255 })
    .withMessage(() => lang('validator.length.max', { field: lang('field.title'), max: 255 })),
  (req, res, next) => validatorFormat(req, res, next)
]
