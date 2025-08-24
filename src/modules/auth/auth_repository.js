const DB = require('../../database');
const { TABLES } = require('../../utils');

exports.findByEmail = (email) => DB(TABLES.USER)
  .where({ email })
  .first();

exports.register = (payload) => DB(TABLES.USER).insert(payload);
