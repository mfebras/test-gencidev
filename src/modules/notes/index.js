const express = require('express');
const { fetch, store, update, destroy } = require('./note_handler');
const { storeValidation } = require('./note_validation');

const router = express.Router();
router.get('/', fetch);
router.post('/', storeValidation, store);
router.put('/:id', storeValidation, update);
router.delete('/:id', destroy);

module.exports = router;
