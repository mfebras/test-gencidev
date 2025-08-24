const express = require('express');
const throttle = require('../middlewares/throttle');
const verifyAuth = require('../middlewares/auth');
const router = express.Router();

const auth = require('../modules/auth');

const PREFIX = '/api/v1';

router.use(`${PREFIX}/auth`, throttle(3), auth);

module.exports = router;
