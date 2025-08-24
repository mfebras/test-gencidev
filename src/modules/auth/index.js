const express = require('express');
const { register, login, refreshToken } = require('./auth_handler');
const {
  registerValidation,
  loginValidation,
  refreshTokenValidation
} = require('./auth_validation');

const router = express.Router();
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/refresh-token', refreshTokenValidation, refreshToken);

module.exports = router;
