const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[environment];
const DB = require('knex')(config);

module.exports = DB;
