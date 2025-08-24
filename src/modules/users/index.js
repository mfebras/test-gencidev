const express = require('express');
const { fetch } = require('./user_handler');

const router = express.Router();
router.get('/', fetch);

module.exports = router;
