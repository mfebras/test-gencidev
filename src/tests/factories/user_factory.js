const { randEmail, randFullName } = require('@ngneat/falso');
const { hashPassword, TABLES } = require('../../utils');
const DB = require('../../database');

exports.createUser = async () => {
  const user = {
    name: randFullName(),
    email: randEmail(),
    password: await hashPassword('112233'),
  };

  const [id] = await DB(TABLES.USER).insert(user).returning('id');
  user.id = id;

  return user;
}
