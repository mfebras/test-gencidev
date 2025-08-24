const DB = require('../../database');
const { check } = require('express-validator');
const config = require('../../config/app');
const lang = require('../../lang');
const { validatorFormat, TABLES } = require('../../utils');

const requiredVal = 'validator.required';
const invalidVal = 'validator.invalid';
const emailField = 'field.email';
const passwordField = 'field.password';

exports.registerValidation = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage(() => lang(requiredVal, { field: lang(emailField) }))
    .bail()
    .isEmail()
    .withMessage(() => lang(invalidVal, { field: lang(emailField) }))
    .bail()
    .custom(async (value) => {
      const user = await DB(TABLES.USER)
        .select('id')
        .where({ email: value })
        .first();

      if (user) {
        throw new Error(lang(invalidVal, { field: lang(emailField) }))
      }

      return true;
    }),
  check('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage(() => lang(requiredVal, { field: lang('field.name') }))
    .bail()
    .isLength({ max: 255 })
    .withMessage(() => lang('validator.length.max', { field: lang('field.name'), max: 255 })),
  check('password')
    .trim()
    .notEmpty()
    .withMessage(() => lang(requiredVal, { field: lang(passwordField) }))
    .bail()
    .isStrongPassword(config.strong_password)
    .withMessage(() => lang('validator.password')),
  check('password_confirmation')
    .trim()
    .notEmpty()
    .withMessage(() => lang(requiredVal, { field: lang('field.password_confirmation') }))
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(lang('validator.password.confirmation'));
      }

      return true;
    }),
  (req, res, next) => validatorFormat(req, res, next)
]

exports.loginValidation = [
  check('email')
    .notEmpty()
    .withMessage(() => lang(requiredVal, { field: lang(emailField) }))
    .bail()
    .isEmail()
    .withMessage(() => lang(invalidVal, { field: lang(emailField) }))
    .bail(),
  check('password')
    .notEmpty()
    .withMessage(() => lang(requiredVal, { field: lang(passwordField) })),
  (req, res, next) => validatorFormat(req, res, next)
]

exports.refreshTokenValidation = [
  check('refresh_token')
    .notEmpty()
    .withMessage(() => lang(requiredVal, { field: 'Refresh token' })),
  (req, res, next) => validatorFormat(req, res, next)
]
