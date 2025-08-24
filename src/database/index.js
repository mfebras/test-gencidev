const { dateFormat } = require('../utils');
const { setTypeParser, builtins } = require('pg').types;

setTypeParser(builtins.TIMESTAMPTZ, val => dateFormat(val, 'YYYY-MM-DD HH:mm:ss'));

const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[environment];
const DB = require('knex')(config);

module.exports = DB;
