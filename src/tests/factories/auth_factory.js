const { getToken, logger, TABLES } = require('../../utils');
const { createUser } = require('./user_factory');
const DB = require('../../database');

exports.getJwt = async () => {
  let user = await DB(TABLES.USER)
    .orderByRaw('RANDOM()')
    .first();

  if (!user) {
    user = await createUser();
  }

  return getToken(user);
}
